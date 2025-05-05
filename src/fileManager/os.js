import { EOL, cpus, homedir, userInfo, arch } from "node:os";

export default function os([arg]) {
  const key = arg.replace("--", "");

  const map = new Map([
    ["EOL", JSON.stringify(EOL)],
    ["cpus", cpus()],
    ["homedir", homedir()],
    ["username", userInfo().username],
    ["architecture", arch()],
  ]);

  console.log(map.get(key) || "Invalid argument");
}
