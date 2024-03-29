import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
    {
        bookname:{
        type : String,
        required : true,
    },
    author:{
        type : String,
        required : true,
    },
    publishyear:{
        type: Number,
        required:true,
    }
},

)


export const BooksModel = mongoose.model("Books", BookSchema)