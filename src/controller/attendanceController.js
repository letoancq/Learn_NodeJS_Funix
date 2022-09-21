const Methods = require("../utils/Methods");
const staff = require("../models/staff");
const dateformat = require("date-format");

class AttendanceController {
  // GET /
  getIndex(req, res) {
    res.render("attendance/index", {
      path: "/attendance",
      pageTitle: "Attendance",
      isStarted: Methods.CheckIsStarted(req.staff),
    });
  }

  // GET /attendance/start
  getStartWork(req, res) {
    res.render("attendance/startForm", {
      path: "/attendance",
      pageTitle: "Attendance",
      name: req.staff.name,
      staff: req.staff,
      isStarted: Methods.CheckIsStarted(req.staff),
    });
  }

  // POST /attendance/start
  postStartWork(req, res) {
    const workPlace = req.body.workPlace;
    const newWorkTimes = {
      startTime: Date.now(),
      workPlace,
      working: true,
      endTime: null,
    };
    req.staff
      .addWorkTimes(newWorkTimes)
      .then((result) => {
        res.redirect("/attendance/infoStart");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // GET /attendance/infoStart
  getInfoStart(req, res) {
    res.render("attendance/startInfo", {
      path: "/attendance",
      pageTitle: "Attendance",
      isStarted: Methods.CheckIsStarted(req.staff),
      workPlace: req.staff.workTimes[req.staff.workTimes.length - 1].workPlace,
      startTime: dateformat(
        "hh:mm",
        req.staff.workTimes[req.staff.workTimes.length - 1].startTime
      ),
      name: req.staff.name,
    });
  }

  // POST /attendance/end
  postEndWork(req, res) {
    const newEndTime = {
      working: false,
      endTime: new Date(),
    };
    req.staff
      .addEndTime(newEndTime)
      .then((result) => {
        res.redirect("/attendance/endInfo");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // GET /attendance/endInfo
  getInfoEnd(req, res) {
    const timeWorked = Methods.calculateTimeWorked(req.staff);
    const staff = req.staff.workTimes.map((workTime) => {
      return {
        startTime: dateformat("hh:mm", workTime.startTime),
        workPlace: workTime.workPlace,
        endTime: dateformat("hh:mm", workTime.endTime),
      };
    });
    res.render("attendance/endInfo", {
      path: "/attendance",
      pageTitle: "Attendance",
      timeWorked,
      workedInDay: Methods.calculateTimeWorked(req.staff),
      isStarted: Methods.CheckIsStarted(req.staff),
      staff,
    });
  }

  // GET /attendance/annulLeave
  getLeaveForm(req, res) {
    res.render("attendance/leaveForm", {
      path: "/attendance",
      pageTitle: "Attendance",
      annualLeave: req.staff.annualLeave,
    });
  }

  // POST /attendance/info
  postLeaveForm(req, res) {
    req.staff
      .addLeaveInfo({
        daysLeave: req.body.daysLeave,
        timesLeave: req.body.hoursLeave,
        reason: req.body.reason,
      })
      .then(() => {
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new AttendanceController();
