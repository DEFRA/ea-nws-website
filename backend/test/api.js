const { spawn, execSync } = require("child_process");
const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const lab = (exports.lab = Lab.script());
const axios = require("axios");
const path = require("path");

const apiDir = path.resolve(__dirname, "../../api");
let apiProcess;

lab.before(async () => {
  console.log(__dirname);
  console.log(apiDir);
  // Compile TypeScript code to JavaScript
  /*console.log("Compiling TypeScript code...");
  try {
    execSync("tsc --project tsconfig.json", { cwd: apiDir, stdio: "inherit" });
  } catch (error) {
    console.error("TypeScript compilation failed");
    process.exit(1);
  }*/

  // Start the API server
  console.log("Starting API server...");
  apiProcess = spawn("node", ["index.js"], {
    env: { ...process.env, PORT: "9000" },
    cwd: apiDir,
  });
  console.log("Started");
  // Wait until the server is ready
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Server did not start within 10 seconds"));
    }, 10000); // 10 seconds timeout

    console.log("awaiting");
    apiProcess.stdout.on("data", (data) => {
      if (data.toString().includes("Server running on")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    console.log("B");
    apiProcess.stderr.on("data", (data) => {
      console.error(data.toString());
      clearTimeout(timeout);
      reject(data.toString());
    });
    console.log("C");
    apiProcess.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
    console.log("D");
  });
});

lab.after(async () => {
  // Stop the API server
  if (apiProcess) {
    apiProcess.kill();
  }
});
