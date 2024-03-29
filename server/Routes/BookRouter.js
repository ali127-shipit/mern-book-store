import  express  from "express";
import { BooksModel } from "../model/BooksModel.js";
const router = express.Router();

router.get("/" , async (req,res)=>{
    try{
        await BooksModel.find( {}, function(err, result ){ 
            if (err || !result ) console.log(" an error has occurred" );
            else {
            console.log(result);
            }
            });
    }catch(err){
        console.log(err.message);
        res.status(404).send({message : err.message})
    }

})


router.post("/addBook",async (req,res)=>{
    try{
        if(
            !req.body.bookname ||
            !req.body.author || 
            !req.body.publishyear
        ){
            res.status(500).send("please send : book name , author and the publish year")
        }else{
            const newbook = req.body
            const book =  BooksModel(newbook);
            await book.save()
            return res.status(200).send(book)
        }

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }

})

export default router;