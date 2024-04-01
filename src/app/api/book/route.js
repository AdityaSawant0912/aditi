import dbconnect from '@/lib/dbconnect'
import Book from '@/models/Book'
import ResponseCache from 'next/dist/server/response-cache';
import { NextResponse } from 'next/server';


export async function GET(req) {
    try {
        await dbconnect();
    } catch (error) {
        return NextResponse.json({ error: 'Database connection error', dberror: error })
    }

    try {
        const books = await Book.find()
        return NextResponse.json(books)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching books', dberror: error })
    }
}

export async function POST(req) {
    const { name, description, author, price, imageUrl } = await req.json()
    console.log(req.body);
    try {
        await dbconnect();
    } catch (error) {
        return NextResponse.json({ error: 'Database connection error', dberror: error })
    }
    try {
        const book = new Book({ name, description, author, price, imageUrl })
        const newBook = await book.save()
        return NextResponse.json(newBook)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error creating book', dberror: error })
    }
}

export async function PUT(req) {
    const { id } = await req.json()
    try {
        await dbconnect();
    } catch (error) {
        return NextResponse.json({ error: 'Database connection error', dberror: error })
    }
    try {
        const book = await Book.findOne({ _id: id })
        return NextResponse.json(book)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching book', dberror: error })
    }
}