/*
implement function that creates number of worker threads
(equal to the number of host machine logical CPU cores) from file worker.js
and able to send data to those threads and to receive result of the computation
from them. You should send incremental number starting from 10 to each worker.
For example: on host machine with 4 cores you should create 4 workers and send
10 to first worker, 11 to second worker, 12 to third worker, 13 to fourth worker.
After all workers will finish, function should log array of results into console.
The results are array of objects with 2 properties:
status - 'resolved' in case of successfully received value from worker or 'error'
in case of error in worker
data - value from worker in case of success or null in case of error in worker
*/
import { cpus } from "node:os";
import { Worker } from "node:worker_threads";

const performCalculations = async () => {
  const workerUrl = new URL("./worker.js", import.meta.url);
  const numCPUs = cpus().length;

  const results = [];
  const workerPromises = [];

  for (let i = 0; i < numCPUs; i++) {
    const workerPromise = new Promise((resolve) => {
      const worker = new Worker(workerUrl);

      worker.on("message", (result) => {
        results.push({
          status: "resolved",
          data: result,
        });
        worker.terminate();
        resolve();
      });

      worker.on("error", (error) => {
        console.log(error);
        results.push({
          status: "error",
          data: null,
        });
        worker.terminate();
        resolve();
      });

      const dataToSend = 10 + i;
      worker.postMessage(dataToSend);
    });

    workerPromises.push(workerPromise);
  }

  await Promise.all(workerPromises);

  console.log(results);
};

await performCalculations();
