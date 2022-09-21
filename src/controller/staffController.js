const Methods = require("../utils/methods");
const dateformat = require("date-format");
const staff = require("../models/staff");

class StaffController {
  //  GET /staff/infoStaff
  getInfoStaff(req, res) {
    res.render("staff/infoStaff", {
      id: req.staff._id.toString(),
      name: req.staff.name,
      dOB: dateformat("dd/MM/yyyy", req.staff.dOB),
      salaryScale: req.staff.salaryScale,
      department: req.staff.department,
      startDate: dateformat("dd/MM/yyyy", req.staff.startDate),
      annualLeave: req.staff.annualLeave,
      image: req.staff.image,
      path: "/staff/infoStaff",
      pageTitle: "Staff Info",
      isStarted: null,
    });
  }

  // POST /staff/edit
  postEditStaff(req, res) {
    req.staff.image = req.body.image;
    req.staff
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => console.log(error));
  }

  // GET /staff/reference
  getReference(req, res) {
    const timeWorked = Methods.calculateTimeWorked(req.staff);
    const workInDay = timeWorked.workTimeInDay.map((work) => {
      const endTime = work.endTime ? dateformat("hh:mm", work.endTime) : "--";
      return {
        startDay: dateformat("dd/MM/yyyy", work.startTime),
        startTime: dateformat("hh:mm", work.startTime),
        workPlace: work.workPlace,
        endTime: endTime,
        working: work.working,
      };
    });
    const overTime = Methods.overTime(Methods.calculateTimeWorked(req.staff));
    const salary = Methods.getSalary(
      req.body.month,
      req.staff,
      Methods.calculateTimeWorked(req.staff),
      Methods.overTime(Methods.calculateTimeWorked(req.staff))
    );
    const dayLeave = req.staff.leaveInfoList.map((leaveInfoList) => {
      return {
        day: dateformat("dd/MM/yyyy", leaveInfoList.daysLeave),
        time: leaveInfoList.timesLeave,
        reason: leaveInfoList.reason,
      };
    });
    res.render("staff/reference", {
      path: "/staff/reference",
      pageTitle: "Reference staff",
      isStarted: null,
      workInDay, // Worked time in a day
      staff: req.staff, // staff
      timeWorked,
      dayLeave, // arry of info annual leave
      salary,
      overTime,
      isStarted: Methods.CheckIsStarted(req.staff),
    });
  }

  // POST /staff/reference
  postReference(req, res) {
    const timeWorked = Methods.calculateTimeWorked(req.staff);
    const workInDay = timeWorked.workTimeInDay.map((work) => {
      return {
        startDay: dateformat("dd/MM/yyyy", work.startTime),
        startTime: dateformat("hh:mm", work.startTime),
        workPlace: work.workPlace,
        endTime: dateformat("hh:mm", work.endTime),
      };
    });

    const overTime = Methods.overTime(Methods.calculateTimeWorked(req.staff));
    const salary = Methods.getSalary(
      req.body.month,
      req.staff,
      Methods.calculateTimeWorked(req.staff),
      Methods.overTime(Methods.calculateTimeWorked(req.staff))
    );
    const dayLeave = req.staff.leaveInfoList.map((leaveInfoList) => {
      return {
        day: dateformat("dd/MM/yyyy", leaveInfoList.daysLeave),
        time: leaveInfoList.timesLeave,
        reason: leaveInfoList.reason,
      };
    });
    const month = req.body.month;
    res.render("staff/reference", {
      path: "/staff/reference",
      pageTitle: "Reference staff",
      isStarted: null,
      workInDay, // Worked time in a day
      timeWorked,
      dayLeave, // arry of info annual leave
      salary,
      overTime,
      month,
      isStarted: Methods.CheckIsStarted(req.staff),
    });
  }
}

module.exports = new StaffController();
