const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// var morgan = require("morgan");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

// app.use(morgan("combined"));

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status("404").render('404', { pageTitle: "404 NotFound" });
});
app.listen(3000);
