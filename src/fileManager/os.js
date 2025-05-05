// Get EOL (default system End-Of-Line) and print it to console
import os from "node:os";

export function eol() {
  return os.EOL;
}

export function cpus() {
  const cpus = os.cpus();
  const cpuInfo = cpus.map((cpu) => ({
    model: cpu.model,
    speed: (cpu.speed / 1000).toFixed(2),
  }));

  return {
    totalCores: cpus.length,
    cpuInfo,
  };
}

export function homedir() {
  return os.homedir();
}

export function username() {
  return os.userInfo().username;
}

export function architecture() {
  return os.arch();
}
