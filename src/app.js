const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");

const router = require("./router/index");
const db = require("./config/db");
const Staff = require("./models/staff");

// Connect to MongoDB
db();

// Set static: public
app.use(express.static(path.join(__dirname, "/public")));

// Parse body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.engine(
  "handlebars",
  handlebars.engine({
    helpers: {
      compare: function (value) {
        return value == 0;
      },
      compare1: function (value) {
        return value < 1;
      },
      covert: function (value) {
        value = value
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return value;
      },
      compare2: function (value) {
        return value == false;
      },
      compare3: function (value) {
        return value == null;
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

// Add staff in request
app.use((req, res, next) => {
  Staff.findOne({ _id: "62ef5791fe72c0254e5347bd" })
    .then((staff) => {
      req.staff = staff;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

// Init router
router(app);

app.listen(3000);
