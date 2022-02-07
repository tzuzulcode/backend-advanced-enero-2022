require("dotenv").config({
    path:process.cwd()+"/src/.env"
})

const config = {
    port:process.env.PORT,
    jwt_scret: process.env.JWT_SECRET,
    oauthClientID: process.env.OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
    oauthCallbackURL: process.env.OAUTH_CALLBACK_URL,
}


module.exports = config