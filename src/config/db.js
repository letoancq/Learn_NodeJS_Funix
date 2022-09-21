const mongoose = require("mongoose");

const Staff = require("../models/staff");

async function connect() {
  try {
    mongoose.connect(
      "mongodb+srv://letoan410:Toanhuong962001@cluster0.b01eqjm.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}

Staff.findOne()
  .then((staff) => {
    if (!staff) {
      const newStaff = new Staff({
        name: "Lê Toản ",
        dOB: new Date(1996, 04, 10),
        salaryScale: 2,
        startDate: new Date(2022, 13, 09),
        department: "IT",
        annualLeave: 15,
        image:
          "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/42238232_1107040746110285_5499546455334977536_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=S16atEHLJdYAX-kCyR9&_nc_ht=scontent.fhan14-1.fna&oh=00_AT8F_BI6jFGMSp9smVn4UWlBSCMg3OWfPr18KxopoirFlw&oe=6351BAE5",
        workTimes: [],
        listInfoList: [],
        bodyTemperature: [],
        vaccineInfo: [],
        infectCovidInfo: [],
      });
      newStaff.save();
    }
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = connect;
