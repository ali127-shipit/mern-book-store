import express from "express";
import { BooksModel } from "../model/BooksModel.js";

const router = express.Router();

router.get("/", async (req,res)=>{

  try{
    const book = await BooksModel.find();

    return res.status(200).json({
      count: book.length,
      data : book,
    })
  }catch(error){
    console.log(error.message);
    res.status(404).send({message: error.message})
  }

});

router.post("/",async (req,res)=>{
  try{
    if(
      !req.body.bookname ||
      !req.body.author ||
      !req.body.publishyear 
    ){
      res.status(404).send("res-send : bookname , author and publishyear")
    }
    const newbook = {
      bookname : req.body.bookname,
      author  : req.body.author,
      publishyear : req.body.publishyear,
    }

    const book = await BooksModel.create(newbook);
    

    return res.status(200).send(book)
    
  }catch(error){
    console.log(error.message);
    res.status(404).send({message: error.message})
  }
});

router.put("/:id" ,async (req,res)=>{

  try{

    const {id }= req.params;

    if(
      !req.body.bookname ||
      !req.body.author ||
      !req.body.publishyear 
    ){
       return res.status(404).send("res-send : bookname , author and publishyear")
    }

    const result = await BooksModel.findByIdAndUpdate(id ,req.body); //findByIdAndUpdate

    if(!result){
      res.status(404).json("book not find")
    }
    return res.status(200).send("book updated succesfully")
  }catch(error){
    console.log(error.message),
    res.status(404).send({message : error.message})
  }
});

router.delete("/:id", async(req,res)=>{
  try{
    const {id} = req.params;

    const result = await BooksModel.findByIdAndDelete(id);
    if(!result){
      return res.status(404).json("book not find")
    }
    return res.status(200).send("book deleted succesfully");

  }catch(error){
    console.log(error.message);
    res.status(404).send({message : error.message})
  }
})

export default router;