Books and Comments API

This repository contains an Express.js application that provides API endpoints for managing books and their comments. The API supports two versions: v1 and v2.

API Routes

<!-- Version 1 (v1) -->

Books Endpoints:

1. GET /api/v1/books: List all books.
2. GET /api/v1/books/:id: Get details of a single book.

<!-- Version 2 (v2) -->

Books Endpoints:

1. GET /api/v2/books: List all books "with comments".
2. GET /api/v2/books/:id: Get details of a single book "with comments".

Comments Endpoints:

1. POST /api/v2/books/:id/comments: Add a comment to a book.
2. GET /api/v2/books/:id/comments: Get all comments for a book.
3. PUT /api/v2/books/:id/comments/:commentId: Edit a comment.
4. DELETE /api/v2/books/:id/comments/:commentId: Delete a comment.

<!-- Clarify (Versioning in this Express API server -> api-bookstore) -->

v1 -> '/api/v1/books' - Book list single,list all, get, update, delete handled

v2 -> '/api/v2/books' - Book and comments(which are added to books) "common" routes handled - list all books with comments, list single book with all its comments.
v2 -> '/api/v2/books/:id/comments' - Also, a separate router added in v2 to handle comments specific routes (which won't be routing through books) - add, get, edit, delete a comment.

v3 -> '/api/v3/books/categories' - To handle routes specific to book categories which are modeled now. No separate router file, all category code in books.js route.

v4 -> '/api/v3/books/tags' - To handle routes specific to book tags which are added to schema after V3. No separate router file, all category code in books.js route.
