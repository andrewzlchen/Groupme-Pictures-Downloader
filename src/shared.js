const fs = require('fs')

const saveJSONToFile = function(path, obj) {
  if (arguments.length !== 2) throw "Invalid number of args!";
  if (!path || typeof path !== "string") throw "Invalid path!";
  if (!obj || typeof obj !== "object") throw "Invalid object!";
  const err = fs.writeFileSync(path, JSON.stringify(obj));
  if (err) throw err;
  else {
    console.log("Successfully wrote to file!")
  }
};

module.exports = {
  saveJSONToFile
}