

async function getSigninStart(context, req) {
  console.log("Received SignInStart request for: ", req.payload)
  if(req.payload.email === 'invalid@email.com') {
    console.log("Invalid email, responding 500")
    return { statusCode: 500, signInToken: "" };
  }
  console.log("Valid email, responding 200")
  return { statusCode: 200, signInToken: "123456" };
  };

async function getSigninValidate(context, req) {
  console.log("Received SignInValidate request -- \n Code: ", req.payload.code, " - SignInToken: ", req.payload.signInToken)
  if(req.payload.code === "999999"){
    console.log("Invalid token")
    return {statusCode: 101, desc: "InvalidToken"}
  }
  console.log("Valid token")
  const profile = {id: '1', enabled: true, firstName: 'John', lastName: 'Smith'}
  const registration = {partner: '4', name: 'NWS England'}
  return { authToken: "MockGUIDAuthToken",  profile: profile, registration, registration};
};
  
  module.exports = { getSigninStart, getSigninValidate };