const userIsSigndout = () => {
    const signInToken = window.sessionStorage.getItem("signInToken");
    let raw = JSON.stringify({"signinToken":signInToken});

    
    if (signInToken === null){
        
        return true;
        }
    else{
        
        return false;
    }
    
}

module.exports = userIsSigndout