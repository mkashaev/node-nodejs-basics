import { readdir } from "node:fs/promises";

async function ls() {
  const targetDir = process.cwd();

  const entries = await readdir(targetDir, { withFileTypes: true });

  const result = entries.map((entry, index) => ({
    Name: entry.name,
    Type: entry.isDirectory() ? "directory" : "file",
  }));

  result.sort((a, b) => {
    if (a.Type !== b.Type) {
      return a.Type === "directory" ? -1 : 1;
    }
    return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
  });

  console.table(result);
}

export default ls;
