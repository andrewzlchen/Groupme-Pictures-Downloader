const axios = require("axios");
const fs = require("fs");
const _ = require("lodash")
const { getFileAsJSON } = require("./shared");

const img_urls = getFileAsJSON("../data/media.json");

// console.log(img_urls.picUrls);

const downloadFromURL = urls => {
  let num = 0;
  urls.forEach(async (url, index) => {
    let ext 
    if (url.includes("jpeg")) ext = "jpeg"
    else if (url.includes("png")) ext = "png"
    else if (url.includes("mp4")) ext = "mp4"
    else ext = "jpg"
    let file = fs.createWriteStream(`../images/file_${index}.${ext}`);
    const request = await axios.get(url)
    if (request.status == 200) {
      console.log(request.data);
      request.data.pipe(file);
    }
  })
};

downloadFromURL(_.take(img_urls.picUrls, 3))