const download = require("download");
const fs = require("fs");

const { getFileAsJSON } = require("./shared");
const imgUrls = getFileAsJSON("data/media.json");

/**
 * Return the extension name of a file. It returns the path itself if the
 * internal array doesn't know of that the file extension that it has.
 *
 * @param {String} path - The url/filepath/filename that we are interested in
 */
const getExt = path => {
  const fileExtensions = ["jpeg", "jpg", "png", "mp3", "mp4", "mov", "gif"];
  for (let ext of fileExtensions) {
    if (path.includes(ext)) return ext;
  }
  // There is a file with a file ext that is not in "fileExtensions"
  return path;
};

/**
 * Pass in an array of images to download them to disk
 * @param {Array} urls - an array of urls that we want to download images from
 */
const downloadFromURL = urls => {
  urls.forEach(async (url, index) => {
    let path = `images/file_${index}.${getExt(url)}`;
    download(url).pipe(fs.createWriteStream(path));
  });
};

const main = async urls => {
  return await downloadFromURL(urls);
};

main(imgUrls.picUrls)