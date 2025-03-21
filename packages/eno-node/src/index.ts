import { Command } from "commander";
import { input, select } from "@inquirer/prompts";
import fse from "fs-extra";
import path, { join } from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getDirname } from "./utils";

const program = new Command();

const generateSelectOptions = (path: string) => {
  const abPath = join(getDirname(import.meta.url), "")
  return [
    {
      name: "npm",
      value: "npm",
      description: "npm is the most popular package manager",
    },
  ];
};

const selectEndFile = async (dirPath: string) => {
  let _filePath = ""
  let _tempDirPath = dirPath;

  while(!_filePath) {
    try {
      const filePath = await select({
        message: "Select a package manager",
        choices: generateSelectOptions(_tempDirPath),
      });
  
      if(fse.statSync(filePath).isFile()) {
        _filePath = filePath;
      }
    } catch(err) {
      break;
    }
  }
};

program
  .command("gen")
  .description("generate a template file")
  .action(async () => {
    const answer = await input({ message: "Enter your name" });
    console.log(answer);
  });

// 配置子命令
program
  .command("greet <name>")
  .description("向指定的人打招呼")
  .option("-t, --time <time>", "指定打招呼的时间", "现在")
  .action((name, options) => {
    const { debug, verbose } = program.opts();
    if (debug) {
      console.log("调试模式已开启");
    }
    if (verbose) {
      console.log("详细输出模式已开启");
    }
    console.log(`在 ${options.time} 向 ${name} 打招呼`);
  });

program.parse();
