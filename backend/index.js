const express = require("express");
const cors = require("cors");
require("dotenv").config()
require("./models/db")
const bodyParser = require("body-parser")
const AuthRouter = require("./routes/AuthRouter")
const ProductRouter = require("./routes/ProductRouter.js")


let app = express();

app.use(cors());

app.use(express.json());


app.use(bodyParser.json())
app.use("/auth",AuthRouter)
app.use("/product",ProductRouter)

app.listen(process.env.PORT,()=>{
    console.log("Listen at Port");
    
})