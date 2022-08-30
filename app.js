const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("this always runs!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In the other middleware");

  res.send("<h1>The add Product page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In the other middleware");
  res.send("<h1>Hello from Express.Js</h1>");
});

app.listen(3000);
