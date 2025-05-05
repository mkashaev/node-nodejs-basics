/*
implement function that parses environment variables with prefix
RSS_ and prints them to the console in the format RSS_name1=value1; RSS_name2=value2
*/

import { env } from "node:process";

const parseEnv = () => {
  const args = Object.entries(env)
    .filter(([key]) => key.startsWith("RSS_"))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  console.log(args);
};

parseEnv();
