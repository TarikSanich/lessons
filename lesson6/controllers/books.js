
import Book from "../models/book.js";

async function getBooks (req, res, next) {
    try {
        const books = await Book.find();

        res.send("Books");
    }catch(error) {
        next(error);
    }
};


async function getBook (req, res, next) {
    const {id} = req.params;

    try {
        const book = await Book.findById(id);

        if (book === null) {
           return res.status(404).send("Book not found") 
        }

        res.send("Book");
    } catch(error) {
        next(error);
    }


};


async function createBook (req, res, next) {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        pages: req.body.pages
    }

    try {
        const result = await Book.create(book);

        console.log(result)

        res.status(201).send("Book");
    
    } catch(error) {
        next(error)
    }


};


async function updateBook (req, res, next) {
    const {id} = req.params;

    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        pages: req.body.pages
    }

    try {

        const result = await Book.findByIdAndUpdate(id, book, {new: true});

        if (book === null) {
            return res.status(404).send("Book not found") 
         }
        
        res.send('Update book ${id}');

    } catch(error) {
        next(error);
    }


};

async function deleteBook (req, res, next) {
    const {id} = req.params;

    try {
        const books = await Book.findByIdAndDelete(id);
        if (book === null) {
            return res.status(404).send("Book not found") 
         }

        res.send({ id });
    }catch(error) {
        next(error);
    }  
};

export default {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}