function up() {
  const currentDir = process.cwd();

  const parentDir = currentDir.split("/").slice(0, -1).join("/");
  if (parentDir) {
    process.chdir(parentDir);
  } else {
    process.chdir("/");
  }
}

export default up;
