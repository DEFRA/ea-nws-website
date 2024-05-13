const signInToken = window.sessionStorage.getItem("signInToken");

const checkUserSignout = route => {
    const routesDontNeedSignIn = ["/signoutmanually", "/signoutautomatically", "/start",
"/SignInPage","/CheckYourEmailPage"]; /*this list may increase*/

    if (!routesDontNeedSignIn.includes(route)){

        let raw = JSON.stringify({"signinToken":signInToken});
        if (raw === ""){
            return true;
        }
        else{
            return false;
        }
    }
}

module.exports = checkUserSignout