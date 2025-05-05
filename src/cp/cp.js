/*
implement function spawnChildProcess that receives array of
arguments args and creates child process from file
*/
import { spawn } from "node:child_process";

const spawnChildProcess = async (args) => {
  const scriptPath = new URL("./files/script.js", import.meta.url).pathname;
  const childProcess = spawn("node", [scriptPath, ...args]);

  childProcess.stdout.on("data", (data) => {
    console.log(`Child process output: ${data}`);
  });

  childProcess.stderr.on("data", (error) => {
    console.error(`Child process error: ${error}`);
  });

  childProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["arg1", "arg2", "arg3"]);
