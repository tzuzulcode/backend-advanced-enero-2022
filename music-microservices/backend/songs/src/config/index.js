require("dotenv").config({
    path: process.cwd() + "/src/.env"
})

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    aws_bucket_name: process.env.AWS_BUCKET_NAME
}

module.exports = config