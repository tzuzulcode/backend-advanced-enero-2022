require("dotenv").config({
    path:process.cwd()+"/src/.env"
})

const config = {
    env : process.env.NODE_ENV,
    port : process.env.PORT
}

module.exports = config