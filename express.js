const express =require("express");
const mongoose =require("mongoose");
const app = express();

app.use(express.json());
mongoose.connect("mongodb+srv://sarahoukaci836:9XehHCwO34ySJt8y@cluster0.pbffrjm.mongodb.net/Book_manager");

//book collection
const bookschema = mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    publication_year:String
})

const bookModel=mongoose.model("Book",bookschema);

app.get("/books",async(req,res) => {
    const books = await bookModel.find({})
    res.send(books)
});

app.get("/books",async(req,res) => {
    const book_id = req.params["id"];
    const book_data = await bookModel.findById(book_id)
    res.send(book_data)
});

app.put("/books/:id",async (req,res)=>{
    const book_title= req.body.title;
    const book_id = req.params["id"];
    
    await bookModel.findByIdAndUpdate(book_id,{title:book_title});
    res.send("Book modified successfully");
});

app.post("/books",async (req,res)=>{
    const title_b =req.body.title;
    const author_b =req.body.author;
    const genre_b =req.body.genre;
    const year_b =req.body.publication_year;
    //const user = new bookModel({title:title_b,author:author_b,genre:genre_b,publication_year:year_b})
    await bookModel.create({title:title_b,author:author_b,genre:genre_b,publication_year:year_b});
    res.send("Book added successfully");
});

app.delete("/books/:id",async (req,res)=>{
    
    const book_id = req.params["id"];
    
    await bookModel.findByIdAndDelate(book_id);
    res.send("Book deleted successfully");
});

app.listen(1600,()=>console.log("Server is running"));
