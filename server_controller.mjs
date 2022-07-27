import express from 'express';
import * as book from './book_reviews_model.mjs';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res, next)=>{
    res.status(200).send({
        "book": "Harry Potter",
        "description": "Some test"
    });
}); 

app.get('/review/:title', (req, res)=>{
    const bookTitle = req.params.title;
    book.findReviews(bookTitle)
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

app.get('/reviewinput', (req, res)=>{
    res.render('index');
});



app.listen(3000, ()=>console.log("Running at port 3000"));