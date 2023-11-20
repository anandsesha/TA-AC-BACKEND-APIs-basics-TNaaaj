Books and Comments API

This repository contains an Express.js application that provides API endpoints for managing books and their comments. The API supports two versions: v1 and v2.

API Routes

<!-- Version 1 (v1) -->

Books Endpoints:

1. GET /api/v1/books: List all books.
2. GET /api/v1/books/:id: Get details of a single book.

<!-- Version 2 (v2) -->

Books Endpoints:

1. GET /api/v2/books: List all books with comments.
2. GET /api/v2/books/:id: Get details of a single book with comments.

Comments Endpoints:

1. POST /api/v2/books/:id/comments: Add a comment to a book.
2. GET /api/v2/books/:id/comments: Get all comments for a book.
3. PUT /api/v2/books/:id/comments/:commentId: Edit a comment.
4. DELETE /api/v2/books/:id/comments/:commentId: Delete a comment.
