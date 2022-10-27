var fs = require("fs"); // add this to the top of your js file

module.exports = {
  default: function () {
    console.log("Usage: node pets.js [read | create | update | destroy]");
  },

  read: function (INDEX) {
    fs.readFile("pets.json", "utf8", function (error, data) {
      data = JSON.parse(data);
      if (error) {
        console.error(err);
        process.exitCode = 2;
      } else if (!INDEX) {
        console.log(data);
      } else if (INDEX > data.length - 1 || INDEX < 0) {
        console.error("Usage: node pets.js read INDEX");
        console.error(
          `Note: INDEX must be a number between 0 and ${data.length - 1} `
        );
      } else {
        console.log(data[INDEX]);
      }
    });
  },

  create: function (age, kind, name) {
    fs.readFile("pets.json", "utf8", function (error, data) {
      data = JSON.parse(data);
      if (error) {
        console.error(err);
        process.exitCode = 2;
      } else if (!age || !kind || !name) {
        console.error("Usage: node pets.js create AGE KIND NAME");
        console.error(
          'Note: An entry for AGE, KIND, and NAME must be present for "create" to execute.'
        );
      } else {
        data.push(
          JSON.parse(`{"age":${age},"kind":"${kind}","name":"${name}"}`)
        );
        fs.writeFile("pets.json", JSON.stringify(data), (err) => {
          if (err) throw err;
          console.log("A new pet has been added!");
        });
      }
    });
  },
  update: function (index, age, kind, name) {
    fs.readFile("pets.json", "utf8", function (error, data) {
      data = JSON.parse(data);
      if (error) {
        console.error(err);
        process.exitCode = 2;
      } else if (!index || !age || !kind || !name) {
        console.error("Usage: node pets.js update INDEX AGE KIND NAME");
        console.error(
          'Note: An entry for INDEX, AGE, KIND, and NAME must be present for "update" to execute.'
        );
        console.error(
          `Note: INDEX must be a number between 0 and ${data.length - 1}.`
        );
      } else {
        data.splice(
          index,
          1,
          JSON.parse(`{"age":${age},"kind":"${kind}","name":"${name}"}`)
        );
        fs.writeFile("pets.json", JSON.stringify(data), (err) => {
          if (err) throw err;
          console.log("A pet has been updated!");
        });
      }
    });
  },
  destroy: function (index) {
    fs.readFile("pets.json", "utf8", function (error, data) {
      data = JSON.parse(data);
      if (error) {
        console.error(err);
        process.exitCode = 2;
      } else if (!index) {
        console.error("Usage: node pets.js destroy INDEX");
        console.error(
          'Note: An entry for INDEX must be present for "destroy" to execute.'
        );
        console.error(
          `Note: INDEX must be a number between 0 and ${data.length - 1}.`
        );
      } else {
        data.splice(index, 1);
        fs.writeFile("pets.json", JSON.stringify(data), (err) => {
          if (err) throw err;
          console.log("A pet has been removed!");
        });
      }
    });
  },
};
