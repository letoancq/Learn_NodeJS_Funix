const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = new Schema({
  name: {
    type: String,
  },
  dOB: {
    type: Date,
  },
  salaryScale: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  department: {
    type: String,
  },
  annualLeave: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
  workTimes: [
    {
      startTime: { type: Date, default: new Date() },
      workPlace: { type: String },
      working: { type: Boolean },
      endTime: { type: Date },
    },
  ],
  leaveInfoList: [
    {
      daysLeave: { type: Date },
      timesLeave: { type: Number },
      reason: { type: String },
    },
  ],
  bodyTemperature: [
    {
      temperature: {
        type: Number,
      },
      date: {
        type: Date,
      },
      time: {
        type: String,
      },
    },
  ],
  vaccineInfo: [
    {
      nameVaccine: { type: String },
      date: { type: Date },
    },
  ],
  infectCovidInfo: [
    {
      datePositive: { type: Date },
      dateRecover: { type: Date },
    },
  ],
});

Staff.methods.addWorkTimes = function (newworkTimes) {
  if (this.workTimes.length < 0) {
    return this.save();
  } else {
    const updateworkTimes = [...this.workTimes];
    updateworkTimes.push(newworkTimes);
    this.workTimes = updateworkTimes;
    return this.save();
  }
};

Staff.methods.addEndTime = function (newEndTime) {
  if (this.workTimes[this.workTimes.length - 1].endTime === null) {
    const lastWorkTime = this.workTimes[this.workTimes.length - 1];
    const updateWorkTime = (lastWorkTime.endTime = newEndTime.endTime);

    this.workTime = updateWorkTime;
    return this.save();
  } else {
    return this.save();
  }
};

Staff.methods.addLeaveInfo = function (newleaveInfo) {
  // update annualLeave
  const { timesLeave } = newleaveInfo;
  this.annualLeave = this.annualLeave - timesLeave / 8;

  // update leaveInfoList
  const updatedLeaveInfoList = [...this.leaveInfoList];
  updatedLeaveInfoList.push(newleaveInfo);
  this.leaveInfoList = updatedLeaveInfoList;
  return this.save();
};

Staff.methods.addInject = function (firstInject, secondInject) {
  const updateVaccineInfo = [...this.vaccineInfo];
  updateVaccineInfo.push(firstInject);
  updateVaccineInfo.push(secondInject);
  this.vaccineInfo = updateVaccineInfo;
  return this.save();
};

module.exports = mongoose.model("Staff", Staff);
