const googleStrategy = require("passport-google-oauth")
const GoogleStrategy = googleStrategy.OAuth2Strategy

const { oauthClientID, oauthClientSecret, oauthCallbackURL } = require("../config")


function googleProvider(){
    return new GoogleStrategy({
        clientID:oauthClientID,
        clientSecret:oauthClientSecret,
        callbackURL:oauthCallbackURL,
        passReqToCallback:true
    },(req,accessToken, refreshToken, profile, cb)=>{
        cb({profile,accessToken})
    })
}


module.exports = googleProvider
