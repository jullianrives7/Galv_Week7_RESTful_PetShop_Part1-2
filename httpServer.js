"use strict";

var fs = require("fs");
var path = require("path");
var petsPath = path.join(__dirname, "pets.json");
var petsFuncs = require("./petsFuncs.js");

var http = require("http");
var port = process.env.PORT || 8000;
var index;

var server = http.createServer(function (req, res) {
  let url = req.url.split("/");
  var optionsList = req.url.match(/^\/pets\/(.*)$/) || [];
  if (optionsList.length > 1) {
    index = optionsList[1];
  }

  console.log(url);
  //url[2]

  if (req.method === "GET" && req.url === "/pets") {
    fs.readFile(petsPath, "utf8", function (err, petsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      }
      res.setHeader("Content-Type", "application/json");
      res.end(petsJSON);
    });
  } else if (req.method === "GET" && index) {
    fs.readFile(petsPath, "utf8", function (err, petsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      } else if (
        (req.method === "GET" &&
          Number(index) > JSON.parse(petsJSON).length - 1) ||
        (req.method === "GET" && Number(index) < 0)
      ) {
        console.log("Should be 404");
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not found");
      }
      //else if (req.method === "POST") {
      //   }
      else {
        res.setHeader("Content-Type", "application/json");
        //res.end(petsJSON);
        res.end(JSON.stringify(JSON.parse(petsJSON)[index]));
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not found");
  }
});

server.listen(port, function () {
  console.log("Listening on port", port);
});
