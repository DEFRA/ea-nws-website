const backendCall = async (raw, call) => {
    let responseData;
    try{
        const response = await fetch(call, 
        {
          method: "POST",
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            "Content-Type": "application/json"
          },
          body: raw,
        })
        responseData = await response.json();        
      }
      catch (error) {
        console.log("ERROR: ", error);
      }
      return responseData;
}

module.exports = backendCall;
