const apiCall = require("../../services/ApiService");
const signInStartValidation = require("../../services/Validations/EmailValidation");

const apiSignInStartCall = async (email) => {
  let isValid = 400;
  let signInToken = "";
  let desc = "";
  const raw = JSON.stringify({ email });
  console.log("Received from front-end: ", raw);
  if (!signInStartValidation(email)) {
    return { code: 101, desc: "Invalid email" };
  }

  const responseData = await apiCall(raw, "member/signinStart");
  console.log("Received from API: ", responseData);
  if (Object.prototype.hasOwnProperty.call(responseData, "desc")) {
    isValid = responseData.code;
    desc = responseData.desc;
    return { code: isValid, desc };
  } else {
    console.log("responseData", responseData);
    isValid = responseData.code;
    signInToken = responseData.signInToken;
    return { code: isValid, signinToken: signInToken };
  }
};

module.exports = [
  {
    method: ["POST", "PUT"],
    path: "/signInStart",
    handler: async (request, h) => {
      try {
        const { email } = request.payload;
        // do some email validation
        const apiResponse = await apiSignInStartCall(email);
        const response = {
          code: apiResponse.code,
          signInToken: apiResponse.signInToken,
        };

        return h.response(response);
      } catch (error) {
        console.error("Error:", error);
        return h.response({ message: "Internal server error" }).code(500);
      }
    },
  },
];
