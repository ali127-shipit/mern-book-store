import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import {PORT, MongoDbUrl} from "./config.js";

import BookRouter from "./Routes/BookRouter.js";



const app  = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));











app.get("/" , (req,res)=>{
    
    return res.status(200).send("Welcome To mern stack book store Project")
})

app.use("/books", BookRouter)

mongoose.connect(MongoDbUrl)
.then(()=>{
    app.listen(PORT, ()=>{
    console.log(`the server is running on Port ${PORT}`);
    console.log("connected to MongoDB");
});
})
.catch((err)=>{
    console.log(err);
})








