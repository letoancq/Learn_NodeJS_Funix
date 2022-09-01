const express = require("express");
var morgan = require("morgan");

const bodyParser = require("body-parser");

const app = express();

app.use(morgan("combined"));

const admonRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(admonRouter);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found </h1>");
});
app.listen(3000);
