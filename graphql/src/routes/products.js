const Products = require("../services/products")
const {Router} = require("express")
function products(app){
    const router = Router()

    //Utilizando el servicio
    const productsServ = new Products()

    app.use("/api/products",router)
    
    router.get("/",async (req,res)=>{
        const products = await productsServ.getAll()
        return res.json(products)
    })
    router.get("/:id",async (req,res)=>{
        const {id} = req.params
        const product = await productsServ.get(id)
        return res.json(product)
    })
    router.post("/",async (req,res)=>{
        const product = await productsServ.create(req.body)
        return res.json(product)
    })
}



module.exports = products