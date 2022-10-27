var fs = require("fs"); // add this to the top of your js file
var petsFuncs = require("./petsFuncs.js");
//console.log(this) in chrome console to view window details
//nano pets.js to view mini version in mac terminal
//node pets.js word <--- word is an argument passed into pets.js;

//console.log(process.argv);
if (!process.argv[2]) {
  petsFuncs.default();
} else if (process.argv[2] === "read") {
  petsFuncs.read(process.argv[3]);
} else if (process.argv[2] === "create") {
  petsFuncs.create(process.argv[3], process.argv[4], process.argv[5]);
} else if (process.argv[2] === "update") {
  petsFuncs.update(
    process.argv[3],
    process.argv[4],
    process.argv[5],
    process.argv[6]
  );
} else if (process.argv[2] === "destroy") {
  petsFuncs.destroy(process.argv[3]);
}

// If the pets.json file ever becomes corrupted, you can reset it with the git checkout command.
// $ git checkout -- pets.json
