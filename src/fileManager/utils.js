import { homedir } from "os";
import { exit } from "node:process";
import cd from "./cd.js";

export function printCurrDir() {
  console.log(`You are currently in ${process.cwd()}`);
}

export function cdHome() {
  const homeDir = homedir();
  console.log("home dir: ", homeDir);
  cd([homeDir]);
}

export function exitProgram(rl, username) {
  const msg = `Thank you for using File Manager, ${username}, goodbye!`;
  console.log(msg);
  exit(0);
}
