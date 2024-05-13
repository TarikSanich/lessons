import Book from "../models/book.js";

function getBooks (req, res, next) {
    res.send("Books")
};


function getBook (req, res, next) {
    const {id} = req.params;

    res.send('Book ${id}');

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


function updateBook (req, res, next) {
    const {id} = req.params;

res.send('Update ${id}');
};

function deleteBook (req, res, next) {
    const {id} = req.params;

    res.send('Delete ${id}') ;   
};

export default {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}