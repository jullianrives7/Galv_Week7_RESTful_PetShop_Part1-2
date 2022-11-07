const express = require("express");
const app = express();
const port = 3000;
var fs = require("fs");
var path = require("path");
var petsPath = path.join(__dirname, "pets.json");
var http = require("http");
const { runInNewContext } = require("vm");

app.use(express.json());

app.get("/pets", (req, res) => {
  fs.readFile(petsPath, "utf8", function (err, petsJSON) {
    res.type("json");
    res.end(petsJSON);
    console.log("Request received!");
    console.log("Displaying all pets data to client.");
  });
});

app.get("/pets/:num", (req, res) => {
  fs.readFile(petsPath, "utf8", function (err, petsJSON) {
    const num = req.params.num;
    let petsLastIndex = JSON.parse(petsJSON).length - 1;
    if (
      (!Number(num) && Number(num) != 0) ||
      Number(num) < 0 ||
      Number(num) > petsLastIndex
    ) {
      res.status(404).json({ error: { message: "Not found" } });
      console.log(
        `Data not found. Please enter a number between 0 and ${petsLastIndex}.`
      );
    } else {
      res.type("json");
      res.end(JSON.stringify(JSON.parse(petsJSON)[num]));
      console.log("Request received!");
      console.log(`Displaying pet data at index ${num} to client.`);
    }
  });
});

app.post("/pets/", (req, res) => {
  fs.readFile(petsPath, "utf8", function (error, petsJSON) {
    let age = JSON.stringify(req.body).match("age");
    let kind = JSON.stringify(req.body).match("kind");
    let name = JSON.stringify(req.body).match("name");
    console.log(req.body);
    console.log(age);
    console.log(kind);
    console.log(name);

    if (age && kind && name) {
      petsJSON = JSON.parse(petsJSON);
      petsJSON.push(req.body);
      console.log(petsJSON);

      fs.writeFile(petsPath, JSON.stringify(petsJSON), (err) => {
        if (err) {
          throw err;
        }
        res.sendStatus(201);
        console.log("Post request received.");
        console.log("pets.JSON has been updated!");
      });
    } else {
      res.sendStatus(400);
    }
  });
});

app.use((req, res) => {
  res.status(404).sendStatus(404);
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
