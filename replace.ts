import { Dirent, readdirSync, readFileSync } from "fs";
import https from "https";
import { basename, resolve } from "path";

const sourceDirPath = resolve(__dirname, "./source/_posts");
const imageUrlReg = /\!\[.*\]\((http.+)\)/g;

async function main() {
  const posts = readdirSync(sourceDirPath, { withFileTypes: true }).filter(
    file => file.isFile()
  );

  for (const post of posts) {
    await processPost(post);
  }
}

async function processPost(postFile: Dirent) {
  // console.log("Start process file: ", postFile.name);
  let fileContent = readFileSync(resolve(sourceDirPath, postFile.name), {
    encoding: "utf8"
  });

  let matched;
  let fileIndex = 1;
  while (true) {
    matched = imageUrlReg.exec(fileContent);
    if (!matched) break;
    const url = matched[1];
    console.log("Dowanload File: ", url);
    const fileData = await download(url);
    console.log("Download Complete: ", url);
    const fileName = basename(postFile.name, ".md") + ".";
    saveFile(fileData, resolve(sourceDirPath, fileName));
    fileIndex++;
  }
}

function download(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let chunks: any[] = [];
    https.get(url, res => {
      res.on("data", chunk => chunks.push(chunk));

      res.once("error", () => {
        reject(new Error("Download Error"));
      });

      res.once("end", () => {
        resolve(Buffer.from(chunks));
      });
    });
  });
}

function saveFile(data: Buffer, fileName: string) {
  console.log(fileName);
}

main();
