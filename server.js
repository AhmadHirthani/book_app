var express = require('express');
var app = express();

app.use(express.static('./public'));
var superagent = require('superagent');
var pg = require('pg');


var cors = require('cors');

require('dotenv').config();
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
const client = new pg.Client(process.env.DATABASE_URL);
PORT = process.env.PORT || 3100;


app.get('/searches/new', function(request, response) {
    response.status(200).render('./pages/searches/new');
});

// app.get('/searches/show', function (request, response) {
//     response.status(200).render('./pages/searches/show',
//     {booksList:booksArray}
//     );
// });

app.get('/', function(request, response) {
    getBooksFromDB(null, (result) => {

        response.status(200).render('./pages/index', {
            booksList: result
        });

    });

})

app.get('/books/detail', function(request, response) {
    console.log(request.query.id);
    getBooksFromDB(request.query.id, (result) => {
        console.log('result: ', result)
        response.status(200).render('./pages/books/detail', {
            book: result[0]
        });

    });

})



function getBooksFromDB(id, callback) {
    console.log('function called')

    let SQL;
    if (id) {
        console.log('using id')
        SQL = `SELECT * FROM books WHERE id=${id};`;
    } else {
        SQL = `SELECT * FROM books;`;
    }
    client.query(SQL)
        .then(result => {

            if (result.rowCount > 0) {
                callback(result.rows);
            } else {
                callback(null);
            }
        }).catch((e) => {
            console.log(e);
        })
}


app.post("/searches", (request, response) => {
    const searchText = request.body.searchText;
    const titleOrAuthor = request.body.searchType;
    let link = `https://www.googleapis.com/books/v1/volumes?q=in${titleOrAuthor}:${searchText}`;
    superagent.get(link)
        .then((returnedData) => {
            console.log('returnedData.body.items: ', returnedData.body.items[0].volumeInfo.title);
            let booksArray = returnedData.body.items.map(item => {
                return new Book(item);
            });
            response.render('./pages/searches/show', { booksList: booksArray });
        });
});

app.get('/*', (request, response) => {
    response.render('pages/error.ejs');
});


client.connect()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`listening on ${PORT}`)
        );
    }).catch((err) => {
        console.log(err.message);
    });

function Book(book) {
    this.author = book && book.volumeInfo && book.volumeInfo.authors || 'No author\'s name provided';
    this.title = book && book.volumeInfo && book.volumeInfo.title || 'No title provided';
    this.image_url = book && book.volumeInfo && book.volumeInfo.imageLinks.thumbnail || 'https://i.imgur.com/J5LVHEL.jpeg';
    this.description = book && book.volumeInfo && book.volumeInfo.description || 'No description provided';
}