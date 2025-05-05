import process from "node:process";
import readline from "node:readline";

import up from "./up";
import cd from "./cd";
import ls from "./ls";
import cat from "./cat";
import add from "./add";
import mkdir from "./mkdir";
import rn from "./rn";
import cp from "./cp";
import mv from "./mv";
import rm from "./rm";

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

rl.prompt();

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
]);

const commands = {
  // OS
  os: {
    EOL,
    cpus,
    homedir,
    username,
    architecture,
  },

  hash: true,
  compress: true,
  decompress: true,
};

rl.on("line", async (line) => {
  const [command, ...args] = line.trim().split(" ");

  try {
    switch (command.toLowerCase()) {
      case "cwd":
        console.log(`Current directory: ${process.cwd()}`);
        break;

      case "cat":
        if (args.length === 0) {
          console.log("Error: Please provide a filename");
          break;
        }
        try {
          const filePath = path.resolve(process.cwd(), args[0]);
          const content = await fs.readFile(filePath, "utf8");
          console.log(content);
        } catch (err) {
          console.log(`Error reading file: ${err.message}`);
        }
        break;
    }
  } catch (err) {
    console.log(`Error listing directory: ${err.message}`);
  }

  console.log(`Command: ${command}`);
  console.log(`Arguments: ${args.join(" ")}`);
}).on("close", () => {
  process.exit(0);
});

// function fileManager() {
//   // parse args varialbes -- --username=your_username
//   const args = process.argv.slice(2);
//   const parsedArgs = {};
//   args.forEach((arg) => {
//     const [key, value] = arg.split("=");
//     parsedArgs[key.replace("--", "")] = value;
//   });

//   console.log(`Welcome to the File Manager, ${parsedArgs.username}!`);

//   // Starting working directory is current user's home directory (for example, on Windows it's something like system_drive/Users/Username)
//   const homeDir = process.env.HOME || process.env.USERPROFILE;
//   const currentDir = process.cwd();
//   console.log(`You are currently in ${currentDir}`);
//   console.log(`Your home directory is ${homeDir}`);

//   // using node api switch to home directory
//   process.chdir(homeDir);
// }

// fileManager();

process.on("SIGINT", () => {
  console.log(
    `\nThank you for using File Manager, ${parsedArgs?.username}, goodbye!`
  );
  process.exit(0);
});
