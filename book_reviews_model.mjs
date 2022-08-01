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
const reviewSchema = mongoose.Schema({
    bookID: {type: Number, required: true},
    title: {type: String, required: true}, 
    authors: {type: String, required: true},
    average_rating: {type: String, required: true},
    isbn: {type: String, required: true},
    isbn13: {type: String, required: true},
    language_code: {type: String, required: true},
    num_pages: {type: String, required: true},
    ratings_count: {type: String, required: true},
    text_reviews_count: {type: String, required: true},
    publication_date: {type: String, required: true},
    publisher: {type: String, required: true}
});

const Review = mongoose.model("Review", reviewSchema);

// Create document of a review
const createReview = async (bookID, title, authors, average_rating, isbn, isbn13, 
                      language, num_pages, ratings_count, text_reviews_count, publication_date, publisher) =>{
                        // Calling constructor to create a new instance 
                        const book = new Review({
                            bookID: bookID,
                            title: title,
                            authors: authors,
                            average_rating: average_rating,
                            isbn: isbn,
                            isbn13: isbn13,
                            language_code: language,
                            num_pages: num_pages,
                            ratings_count: ratings_count,
                            text_reviews_count: text_reviews_count,
                            publication_date: publication_date,
                            publisher: publisher
                        });

                        // Save document in MongoDB
                        return book.save();
                      }

const findReviews = async (filter)=> {
    const query = Review.find(filter);
    if (filter.length > 0){
        query.and(filter);
    }
    return query.exec();
}

export {findReviews, createReview};