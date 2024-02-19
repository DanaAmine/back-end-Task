const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs'); // Setting EJS as the view engine
app.use(express.json());
//make the link in env File and add .gitignore file
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.pbffrjm.mongodb.net/Book_manager");

// Define book collection schema
const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    publication_year: String
});

// Create book model
const Book = mongoose.model("Book", bookSchema);

// Get all books
app.get("/books", async (req, res) => {
    const books = await Book.find({});
    res.render('books', { books }); // Rendering 'books' view with data
});

// Get book by ID
app.get("/books/:id", async (req, res) => {
    const book_id = req.params.id;  // not ["id"]
    const book_data = await Book.findById(book_id);
    res.render('book', { book_data }); // Rendering 'book' view with data
});

// Update book by ID
app.put("/books/:id", async (req, res) => {
    const { title } = req.body;
    const book_id = req.params.id;
    
    await Book.findByIdAndUpdate(book_id, { title });
    res.send("Book modified successfully");
});

// Add a new book
app.post("/books", async (req, res) => {
    const { title, author, genre, publication_year } = req.body;
    await Book.create({ title, author, genre, publication_year });
    res.send("Book added successfully");
});

// Delete book by ID
app.delete("/books/:id", async (req, res) => {
    const book_id = req.params.id;
    await Book.findByIdAndDelete(book_id);
    res.send("Book deleted successfully");
});

// Start the server
app.listen(1600, () => console.log("Server is running")); 
