const { buildSchema } = require("graphql")

//const {Router} = require("express")
const root = {
    hello:()=>{
        return 'Hola mundo'
    }
}

let schemas = buildSchema(`
    type Query{
        hello: String
    }
`)

module.exports = {root,schemas}