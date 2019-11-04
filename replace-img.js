const fs = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");

// 正则
// const regexOne = /(?<=\!\[.*\]\()(.+)(?=\))/;
const regexOne = /(?<=\!\[.*\]\()(.{10,200})(?=\))/;
// const regexOne = /\!\[([^\]]+)\]\(((https?:)?\/\/[^)]+)\)/g;

const files = fs.readdirSync("./source/_posts", {
  withFileTypes: true
});

files.forEach((file, index) => {
  // if (index > 0) return;
  if (file.isFile()) {
    replaceFile(file);
  }
});

async function replaceFile(file, index = 0) {
  index++;
  const _path = __dirname + "/source/_posts/" + file.name;

  // 读取文件内容
  const fileData = fs.readFileSync(_path, "utf8");
  const dirName = path.basename(file.name, ".md");

  if (!fileData.match(regexOne)) return;

  const url = fileData.match(regexOne)[0];
  console.log(777, url, !url);

  await download(url, dirName, index);
  replaceFile(file, index);
}

// 下载图片，保存到相应文件夹
function download(url, dirName = "test", imgFileName = "1") {
  return new Promise((resolve, reject) => {
    const HTTP = url.includes("http://") ? http : https;

    HTTP.get(url, response => {
      let imgData = "";
      console.log(123, response.statusCode, response.headers.location);
      response.setEncoding("binary");
      if (response.statusCode == 301)
        download(response.headers.location, dirName, imgFileName);

      response.on("data", chunk => {
        imgData += chunk;
      });

      response.on("end", () => {
        const dirPath = `./source/_posts/${dirName}`;

        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

        fs.writeFileSync(`${dirPath}/${imgFileName}.jpg`, imgData, "binary");

        console.log(11, "保存success");

        // 读取文件内容 替换图片链接
        const filePath = __dirname + "/source/_posts/" + dirName + ".md";
        const fileData = fs.readFileSync(filePath, "utf8");
        const newFile = fileData.replace(regexOne, `./${imgFileName}.jpg`);
        fs.writeFileSync(filePath, newFile);

        resolve(200);
      });
    }).on("error", err => {
      console.log(err);
      reject(500);
    });
  });
}
