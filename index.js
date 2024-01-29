const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const TradeRouter = require("./routers/tradeRouter")
dotenv.config()

mongoose.connect(
    process.env.MONGODB
).then(()=>console.log("Database connected"))
.catch((err) => {
    console.log(err);
})

app.use(express.json())

app.listen(3000,()=>{
    console.log("server is running");
    
})
app.use("/api/", TradeRouter)
