var express = require('express');
var routerV1 = express.Router(); // for /api/v1/books
var routerV2 = express.Router(); // for /api/v2/books (book enhancements - added comments to books)
var routerV3 = express.Router(); // for /api/v3/books/categories (added category)
const Book = require('../models/Book');

// Version 1: Endpoints for Books

// GET /api/v1/books - list of all books
routerV1.get('/', async (req, res, next) => {
  try {
    var allBooks = await Book.find({});
    res.status(200).json({ allBooks });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/books/:id - get single book
routerV1.get('/:id', async (req, res, next) => {
  try {
    var bookId = req.params.id;
    var book = await Book.findById(bookId);
    res.status(200).json({ book });
  } catch (err) {
    console.log(`In Catch`);
    next(`Cannot get this findByID User`);
  }
});

// POST /api/v1/books - create a book
routerV1.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    var newBook = await Book.create(req.body);
    res.json(newBook);
  } catch (err) {
    next(`Error inserting book into MongoDB`);
  }
});

// PUT /api/v1/books/:id - update a book
routerV1.put('/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    // Find the book by ID and update it
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/v1/books/:id - delete a book
routerV1.put('/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    // Find the book by ID and update it
    const removedBook = await Book.findByIdAndRemove(bookId);

    if (!removedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ msg: 'Book Deleted Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//-----------------------------------------------------------------------------------------//

// Version 2: Endpoints for Books and Comments  (routerV2 -> /api/v2/books)
// Comments handled separately in comments.js router

// 1. GET /api/v2/books - list of all books with comments (displayed on the dashboard page)
routerV2.get('/', async (req, res, next) => {
  try {
    var allBooksWithComments = await Book.find({}).populate('comments').exec();
    res.status(200).json({ allBooksWithComments });
  } catch (err) {
    next(err);
  }
});

// 2.  GET /api/v2/books/:id - get single book with comments (displayed on singleBook page)
routerV2.get('/:id', async (req, res, next) => {
  try {
    var bookId = req.params.id;
    var singleBook = await Book.findById(bookId).populate('comments').exec();
    res.status(200).json({ singleBook });
  } catch (err) {
    next('Cannot get this findById Book along with its comments');
  }
});

// Comments handled separately in -> comments.js router

//-----------------------------------------------------------------------------------------//
// Version 3: Endpoints for Book CATEGORIES

// POST /api/v3/books/categories  - create a category
routerV3.post('/', async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    // Check if the category already exists
    const existingCategory = await Book.findOne({ categories: categoryName });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    // Create a new category
    const newCategory = await Book.create({ categories: [categoryName] });

    res.status(201).json(newCategory.categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { routerV1, routerV2 };
