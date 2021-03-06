"use strict";

const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/about", (req, res, next) => {
  res.sendFile(__dirname + "/views/about.html");
});

app.get("/gallery", (req, res, next) => {
  res.sendFile(__dirname + "/views/gallery.html");
});

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.sendFile(__dirname + "/views/error404.html");
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.send("error");
  }
});

// El servidor escucha al puerto 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
