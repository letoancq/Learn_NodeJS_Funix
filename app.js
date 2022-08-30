const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware");
  next(); //cho phep midleware tiep tuc dn mmiddleware tiep theo
});

app.use((req, res, next) => {
  console.log("In the other middleware");
  
  res.send("<h1>Hello ae</h1>");
});

const server = http.createServer(app);

server.listen(3000);
