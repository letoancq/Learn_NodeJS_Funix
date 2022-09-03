const path = require("path");

const express = require("express");
const rootDir = require("../utils/path");

const adminData = require("./admin");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("shop.js :", adminData.products);
  res.sendFile(path.join(rootDir, "veiws", "shop.html"));
});

module.exports = router;
