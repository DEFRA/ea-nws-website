import fetch from "node-fetch";
const backendCall = async (raw, call) => {
  let responseData;
  const url = "http://localhost:3000/" + call;
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    });
    responseData = await response.json();
  } catch (error) {
    console.log("ERROR: ", error);
  }
  return responseData;
};

module.exports = backendCall;
