const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

router.get('/books', async (req, res) => {
    try {
        const {page = 1, limit = 5} = req.query;
        const skipCount = (page-1)*limit;
        let queryObj = {};

        if (req.query.name) {
          queryObj.name = { $regex: req.query.name, $options: 'i' };
        }
    
        if (req.query.author) {
          queryObj.author = { $regex: req.query.author, $options: 'i' };
        }
    
        if (req.query.publisher) {
          queryObj.publisher = { $regex: req.query.publisher, $options: 'i' };
        }
    
        if (req.query.genre) {
          queryObj.genre = req.query.genre;
        }
    
        if (req.query.priceMin || req.query.priceMax) {
          queryObj.price = {};
          if (req.query.priceMin) queryObj.price.$gte = Number(req.query.priceMin);
          if (req.query.priceMax) queryObj.price.$lte = Number(req.query.priceMax);
        }
        console.log(queryObj);
        const books = await Book.find(queryObj).skip(skipCount).limit(limit).lean();
    
        res.status(200).json(books);
      } catch (err) {
        // next(err);
        res.status(500).send(err);
      }
});

router.get('/books/list/:field', async (req, res) => {
    try{
        const field = req.params.field;
        if(!['author', 'genre', 'publisher'].includes(field)) {
            return res.status(404).send("Invalid field");
        }
        // console.log(fields);
        const fieldList = await Book.distinct(field);
        // console.log(fieldList);
        res.status(200).send(fieldList);
    }
    catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
})

router.post('/books', async (req, res) => {
    try {
        const book = req.body;
    
        if(!book.name || !book.author || !book.publisher || !book.publisher || !book.genre || !book.price) {
            return res.status(400).send("One or more fields missing");
        }
        book.price = +book.price;
        const bookDocument = new Book(book);

        await bookDocument.save();
        res.status(200).send(bookDocument);
    }
    catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
})


router.delete('/books/:id', async (req, res) => {
    try {
        const bookDocument = await Book.findById(req.params.id);
        console.log(req.params.id);
        if(!bookDocument) {
            return res.status(404).send("Book with give ID does not exist");
        }
        await bookDocument.deleteOne();
        res.status(200).send("Book Deleted");
    }
    catch(err) {
        res.status(500).send(err);
    }
});

router.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { name, author, publisher, genre, price } = req.body;

    try {
        const book = await Book.findByIdAndUpdate(id, { name, author, publisher, genre, price }, { new: true, runValidators: true }).lean();
        
        if (!book) {
            return res.status(404).send('Book not found');
        }

        res.send(book);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;