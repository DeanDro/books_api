import express from 'express';
import * as book from './book_reviews_model.mjs';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res, next)=>{
    res.render('index');
}); 

// Search a book based on the title.
app.get('/review/:title', (req, res)=>{
    const bookTitle = req.params.title;
    let bookFilter = {title: {$regex: bookTitle}};  // We use $regex to return all results that match the query
    book.findReviews(bookFilter)
        .then(review=> {
            if (review !== null){
                res.json(review);
            } else {
                res.status(404).json({Error: "Book wasn't found"});
            }
        })
        .catch(error=>{
            res.status(400).json({Error: "Request failled"});
        });
});

// Search a book based on the isbn number
app.get('/isbn/:isbn', (req, res)=>{
    const isbnNum = req.params.isbn;
    let filter = {isbn: isbnNum};
    book.findReviews(filter)
    .then(review=> {
        if (review !== null){
            res.json(review);
        } else {
            res.status(404).json({Error: "Book wasn't found"});
        }
    })
    .catch(error=>{
        res.status(400).json({Error: "Request failled"});
    });
});

// Path for creating a new review
app.post('/reviewbook', (req, res)=>{
    book.createReview(req.body.bookID,
        req.body.title,
        req.body.authors,
        req.body.average_rating,
        req.body.isbn,
        req.body.isbn13,
        req.body.language,
        req.body.num_pages,
        req.body.ratings_count,
        req.body.publication_date,
        req.body.publisher)
    .then(review=> {
        res.status(201).json(review);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error: 'Request failed'});
    });
});

// Store an input to the database
function storeDataInDatabase(data){
    book.createReview(
        data["bookID"], 
        data["title"],
        data["authors"],
        data["average_rating"],
        data["isbn"],
        data["isbn13"],
        data["language_code"],
        data["num_pages"],
        data["ratings_count"],
        data["text_reviews_count"],
        data["publication_date"],
        data["publisher"]
    )
    .then(res=>console.log(res))
    .catch(error=>console.error(error));
};

app.listen(PORT, ()=>console.log(`Running at port ${PORT}`));

export { storeDataInDatabase };