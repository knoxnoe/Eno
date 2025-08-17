import fse from "fs-extra";
import { join, dirname } from "node:path";
import { fileURLToPath } from "url";

const getDirname = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = dirname(__filename);
  return __dirname;
};

const getAllDirsAndFiles = async (absolutePath: string) => {
  fse
    .readdir(absolutePath)
    .then( async (files) => {
      const promises = files.map( async (file) => {
        const filePath = join(absolutePath, file);
        return fse.stat(filePath).then((stat) => {
          return {
            name: file,
            path: filePath,
            isDirectory: stat.isDirectory(),
          };
        });
      });

      return Promise.all(promises);
    })
    .catch((err) => {
      throw new Error(`read ${absolutePath} error`);
    });
};

const resourceDir = join(getDirname(import.meta.url), "../resource");

getAllDirsAndFiles(resourceDir);

export { getAllDirsAndFiles, getDirname };
