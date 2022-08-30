const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("this always runs!");
  next();
});

app.use("/test", (req, res, next) => {
  console.log("In the other middleware");

  res.send("<h1>Hello test 500 ae</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In the other middleware");
  res.send("<h1>Hello ae</h1>");
});

app.listen(3000);
