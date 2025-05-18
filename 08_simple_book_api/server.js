const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const books = [
    {
        id: 1,
        title: "If you're troubled, Wish upon the stars",
        author: "Abe Miyuki"
    },
    {
        id: 2,
        title:  "Tower of God",
        author: "S.I.U"
    },
    {
        id: 3,
        title: "Detective Conan",
        author: "Gosho Aoyama"
    },
    {
        id: 4,
        title: "Harry Potter",
        author: "J.K Rowling"
    }
];


app.get("/", (req, res) => {
  res.send("Simple Book API using Node.js and Express");
});
  
app.get("/api/books", (req, res) => {
  res.json(books);
});
  
app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});
  

  app.post("/api/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

  
app.patch("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});


  
app.delete("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  books.splice(index, 1);
  res.json({ message: "Book deleted successfully" });
});