const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=> {
    let userswithsamename = users.filter((user)=>{
        return user.username = username
    });
    if (userswithsamename.length >0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
    const username = req.body.username
    const password = req.body.password

    if (username && password) {
        if (!doesExist(username)) {
            users.push({"username":username, "password":password});
            return res.status(200).json({message: `User ${username} successfully registered. Now you can login`})
        } else {
            return res.status(404).json({message: `User ${username} already exists`})
        }
    }
    return res.status(404).json({message:"Unable to resiter user."})

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(books)
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  res.send(books[req.params.isbn])
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
    const author = req.params.author
    let books_selected = []
    for (var i in books) {
        if (books[i].author == author) {
            books_selected.push(books[i])
        }
    } 
    if (books_selected.length > 0) {
        res.send(books_selected)
    } else{
        res.send(`No books by author ${author}.`)
    }    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
    const title = req.params.title
    let books_selected = []
    for (var i in books) {
        if (books[i].title == title) {
            books_selected.push(books[i])
        }
    } 
    if (books_selected.length > 0) {
        res.send(books_selected)
    } else{
        res.send(`No books in title ${title}.`)
    }    
    });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
    const isbn = req.params.isbn;

    res.send(books[isbn].reviews)

});

module.exports.general = public_users;
