async function ls() {
  const targetDir = process.cwd(); // or set a specific directory

  const entries = fs.readdirSync(targetDir, { withFileTypes: true });

  const result = entries.map((entry, index) => ({
    index,
    Name: entry.name,
    Type: entry.isDirectory() ? "directory" : "file",
  }));

  console.table(result);

  // try {
  //   const dirPath = args[0] || process.cwd();
  //   const files = await fs.readdir(dirPath);
  //   console.log(`Contents of ${dirPath}:`);
  //   for (const file of files) {
  //     try {
  //       const stats = await fs.stat(path.join(dirPath, file));
  //       const type = stats.isDirectory() ? "dir" : "file";
  //       const size = stats.size;
  //       console.log(`${file} (${type}, ${size} bytes)`);
  //     } catch (err) {
  //       console.log(`${file} (error)`);
  //     }
  //   }
  // } catch (err) {
  //   console.log(`Error listing directory: ${err.message}`);
  // }
}

export default ls;
