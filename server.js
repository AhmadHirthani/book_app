

var express = require('express');
var app = express();

app.use(express.static('./public'));
var superagent=require('superagent');


var cors = require('cors');

require('dotenv').config();
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
PORT = process.env.PORT || 3100;


app.get('/searches/new', function (request, response) {
    response.status(200).render('./pages/searches/new');
});

// app.get('/searches/show', function (request, response) {
//     response.status(200).render('./pages/searches/show',
//     {booksList:booksArray}
//     );
// });

app.get('/hello', function (request, response) {
    response.status(200).render('./pages/index', {
        wellcomeMessage: 'helloWorld'
    });
})


app.post("/searches", (request, response) => {
    const  searchText = request.body. searchText;
    const titleOrAuthor=request.body.searchType;
    let link = `https://www.googleapis.com/books/v1/volumes?q=in${titleOrAuthor}:${searchText}`;


    //superagent.get(encodeURI(url))

    superagent.get(link)
      .then((returnedData) =>{
          console.log('returnedData.body.items: ',returnedData.body.items[0].volumeInfo.title);
        let booksArray = returnedData.body.items.map(item => {
          return new Book(item);
        });
        response.render('./pages/searches/show',{booksList:booksArray});
  
      } 
      );
  });

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})



// function Book(book) {
//     // this.author = book.volumeInfo.authors[0] || 'No author\'s name provided';
//     this.title = book.volumeInfo.title || 'No title provided';
//     // this.image_url = book.volumeInfo.imageLinks.thumbnail || 'https://i.imgur.com/J5LVHEL.jpeg';
//     // this.description = book.volumeInfo.description || 'No description provided';
//   }


  function Book(book) {
    this.author = book && book.volumeInfo && book.volumeInfo.authors || 'No author\'s name provided';
    this.title = book && book.volumeInfo && book.volumeInfo.title || 'No title provided';
    this.image_url = book && book.volumeInfo && book.volumeInfo.imageLinks.thumbnail || 'https://i.imgur.com/J5LVHEL.jpeg';
    this.description = book && book.volumeInfo && book.volumeInfo.description || 'No description provided';
  }