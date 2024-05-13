import mongoose from "mongoose";

const bookShema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    year: Number,
    pages: Number
});

export default mongoose.model("Book", bookShema);