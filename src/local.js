var axios = require("axios");
var fs = require("fs");

const downloadFromURL = () => {
  const file = fs.createWriteStream("file.jpg");
  const request = axios.get(url, response => {
    response.pipe(file);
  });
};
