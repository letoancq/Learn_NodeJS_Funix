const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const admonRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(admonRouter);
app.use(shopRouter);

app.listen(3000);
