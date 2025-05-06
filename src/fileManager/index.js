import process from "node:process";
import readline from "node:readline";

import { cdHome, exitProgram, printCurrDir } from "./utils.js";

import up from "./up.js";
import cd from "./cd.js";
import ls from "./ls.js";
import cat from "./cat.js";
import add from "./add.js";
import mkdir from "./mkdir.js";
import rn from "./rn.js";
import cp from "./cp.js";
import mv from "./mv.js";
import rm from "./rm.js";
import os from "./os.js";
import calcHash from "./hash.js";
import compress from "./compress.js";
import decompress from "./decompress.js";

const args = process.argv.slice(2);
const parsedArgs = {};

args.forEach((arg) => {
  const [key, value] = arg.split("=");
  parsedArgs[key.replace("--", "")] = value;
});

console.log(`Welcome to the File Manager, ${parsedArgs.username}!`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

const commandsMap = new Map([
  ["up", up],
  ["cd", cd],
  ["ls", ls],
  ["cat", cat],
  ["add", add],
  ["mkdir", mkdir],
  ["rn", rn],
  ["cp", cp],
  ["mv", mv],
  ["rm", rm],
  ["os", os],
  ["hash", calcHash],
  ["compress", compress],
  ["decompress", decompress],
]);

cdHome();
printCurrDir();
rl.prompt();

rl.on("line", async (line) => {
  const [command, ...args] = line.trim().split(" ");

  const key = command.toLowerCase();

  if (key === ".exit") {
    exitProgram(parsedArgs?.username);
    rl.prompt();
    return;
  }

  const func = commandsMap.get(key);

  if (!func) {
    console.log(`Invalid input: ${command}`);
    rl.prompt();
    return;
  }

  try {
    await func(args);
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
  }

  printCurrDir();
  rl.prompt();
}).on("close", () => {
  exitProgram(parsedArgs?.username);
});

process.on("SIGINT", () => {
  exitProgram(parsedArgs?.username);
});
