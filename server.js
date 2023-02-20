/*

First Install de dependencies:

npm install express mongoose body-parser


*/


/* In this example, we first import the required modules, including express, mongoose, and body-parser. We then set up the express app and connect to a local MongoDB database using mongoose.

We define a schema for the data we'll be working with and create a model using the schema. We then define API routes for handling HTTP requests using app.get(), app.post(), app.put(), and app.delete().

For example, the GET /books route retrieves all books from the database and returns them as a JSON response. The POST /books route creates a new book by parsing the request body and saving it to the database. The PUT /books/:id route updates an existing book by finding it based on the id parameter and replacing it with the new data in the request body. The DELETE /books/:id route deletes a book based on the id parameter.

Finally, we start the server and listen on the specified port. This is just a basic example, but you can extend it to handle more complex data and operations as needed.

*/


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Set up express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define schema for data
const BookSchema = mongoose.Schema({
  title: String,
  author: String,
  published_date: Date,
  pages: Number
});

// Create model for data
const Book = mongoose.model('Book', BookSchema);

// Define API routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/books', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      res.send(err);
    } else {
      res.json(books);
    }
  });
});

app.post('/books', (req, res) => {
  const book = new Book(req.body);
  book.save((err, book) => {
    if (err) {
      res.send(err);
    } else {
      res.json(book);
    }
  });
});

app.put('/books/:id', (req, res) => {
  Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, book) => {
    if (err) {
      res.send(err);
    } else {
      res.json(book);
    }
  });
});

app.delete('/books/:id', (req, res) => {
  Book.findOneAndDelete({ _id: req.params.id }, (err, book) => {
    if (err) {
      res.send(err);
    } else {
      res.json(book);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
