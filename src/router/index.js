const attendanceRouter = require("./attendance");
const homeRouter = require("./home");
const staffRouter = require("./infoStaff");
const covidDetailRouter = require("./covidDetail");

function router(app) {
  app.use("/attendance", attendanceRouter);
  app.use("/staff", staffRouter);
  app.use("/covidDetail", covidDetailRouter);
  app.use("/", homeRouter);
}

module.exports = router;
