import {
  Request,
  Response,
} from 'express';

import { Book } from '../models/bookModel';

export const createBook = async (req: Request, res: Response): Promise<void> => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const books = await Book.find();
    res.json(books);
};

export const getBook = async (req: Request, res: Response): Promise<void> => {
    const book = await Book.findById(req.params.id);
    res.json(book);
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
};
