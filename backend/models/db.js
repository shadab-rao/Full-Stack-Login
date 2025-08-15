const mongoose = require("mongoose")

const dbURL = process.env.DBUrl

mongoose.connect(dbURL).then(()=>{
    console.log("Server is running");
    
}).catch((err)=>{
    console.log("Mongodb connection error",err);
    
})