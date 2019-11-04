const fs = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");

const regex = /\!\[.*\]\((http.*)\)/;
const postDirPath = path.resolve(__dirname, "./source/_posts");

function main() {
  const files = fs.readdirSync(postDirPath, {
    withFileTypes: true
  });

  files.forEach(file => {
    if (file.isFile()) replaceFile(file);
  });
}

async function replaceFile(file, imgIndex = 0) {
  imgIndex++;
  const filePath = path.resolve(postDirPath, file.name);
  const fileData = fs.readFileSync(filePath, "utf8");

  if (!regex.exec(fileData)) return;
  const url = regex.exec(fileData)[1];

  const imgData = await download(url);
  const dirName = path.basename(file.name, ".md");
  saveImg(dirName, imgIndex, imgData);
  replace(filePath, imgIndex, url);

  replaceFile(file, imgIndex);
}

function download(url) {
  return new Promise((resolve, reject) => {
    const HTTP = url.includes("http://") ? http : https;
    HTTP.get(url, response => {
      let imgData = "";
      response.setEncoding("binary");
      if (response.statusCode == 301) download(response.headers.location);

      response.on("data", chunk => (imgData += chunk));
      response.on("end", () => {
        resolve(imgData);
      });
    }).on("error", err => reject(err));
  });
}

function saveImg(dirName, imgFileName, imgData) {
  const dirPath = path.resolve(postDirPath, dirName);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  fs.writeFileSync(`${dirPath}/${imgFileName}.jpg`, imgData, "binary");
}

function replace(filePath, imgFileName, url) {
  const fileData = fs.readFileSync(filePath, "utf8");
  const newFile = fileData.replace(url, `./${imgFileName}.jpg`);
  fs.writeFileSync(filePath, newFile);
}

main();
