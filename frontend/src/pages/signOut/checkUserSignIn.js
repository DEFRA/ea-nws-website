const signInToken = window.sessionStorage.getItem("signInToken");

const userIsSigndout = () => {
    let raw = JSON.stringify({"signinToken":signInToken});

    if (raw === ""){
        return true;
        }
    else{
        return false;
    }
    
}

module.exports = userIsSigndout