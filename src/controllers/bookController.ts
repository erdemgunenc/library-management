import { Request, Response } from "express";
import {
  createBookService,
  getBookByIdService,
  getBookService,
} from "../services/bookService";
import { CreateBookServiceDTO } from "../dto/create-book.dto";

export const createNewBook = async (req: Request, res: Response) => {
  const bookData: CreateBookServiceDTO = req.body;
  const newBook = await createBookService(bookData);
  res.json(newBook);
};

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await getBookService();
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const book = await getBookByIdService(id);
  res.json(book);
};
