/*
implement function that parses command line arguments
(given in format --propName value --prop2Name value2, you don't need to validate it)
and prints them to the console in the format propName is value, prop2Name is value2
*/
import { argv } from "node:process";

const parseArgs = () => {
  const args = argv.slice(2);
  const parsedArgs = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, "");
    const value = args[i + 1];
    parsedArgs[key] = value;
  }

  const formattedArgs = Object.entries(parsedArgs)
    .map(([key, value]) => `${key} is ${value}`)
    .join(", ");

  console.log(formattedArgs);
};

parseArgs();
