const userIsSigndout = () => {
    const signInToken = window.sessionStorage.getItem("signInToken");
    if (signInToken === null){
        
        return true;
        }
    else{
        
        return false;
    }
    
}

module.exports = userIsSigndout