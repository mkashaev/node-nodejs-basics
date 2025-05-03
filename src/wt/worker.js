/*
extend given function to work with data receivedfrom
main thread and implement function which sends result
of the computation to the main thread
*/
import { parentPort } from "node:worker_threads";

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  parentPort.on("message", (n) => {
    try {
      const result = nthFibonacci(n);

      parentPort.postMessage(result);
    } catch (error) {
      throw error;
    }
  });
};

sendResult();
