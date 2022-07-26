'use strict';

// Make a connection to the local database
import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/books_reviews",
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", ()=>{
    console.log('Successfully connected to MongoDB database.');
});

// Define schema for reviews
const Review = mongoose.Schema({
    bookID: {type: Number, required: true},
    title: {type: String, required: true}, 
    authors: {type: String, required: true},
    average_rating: {type: Number, required: true},
    isbn: {type: Number, required: true},
    isbn13: {type: Number, required: true},
    language: {type: String, required: true},
    num_pages: {type: Number, required: true},
    ratings_count: {type: Number, required: true},
    publication_date: {type: Date, required: true},
    publisher: {type: String, required: true}
});

const createReview = async (bookID, title, authors, average_rating, isbn, isbn13, 
                      language, num_pages, ratings_count, publication_date, publisher) =>{
                        // Calling constructor to create a new instance 
                        const book = new Review({
                            bookID: bookID,
                            title: title,
                            authors: authors,
                            average_rating: average_rating,
                            isbn: isbn,
                            isbn13: isbn13,
                            language: language,
                            num_pages: num_pages,
                            ratings_count: ratings_count,
                            publication_date: publication_date,
                            publisher: publisher
                        });

                        // Save document in MongoDB
                        return book.save();
                      }

const findReviews = async (filter, projection, limit)=> {
    const query = Review.find();
    if (filter.length > 0){
        query.and(filter);
    }
    return query.exec();
}

export {findReviews, createReview};