import { Schema, model, models } from 'mongoose'

const BooksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    }
    
})

module.exports = models.Book || model('Book', BooksSchema)
