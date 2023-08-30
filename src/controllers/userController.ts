import { Request, Response } from "express";
import * as userService from "../services/userService";
import * as bookService from "../services/bookService";
import { Messages } from "../utils/constants";
import { CreateUserResponse, GetUserResponse } from "../dto/user.dto";
import { CreateBookingResponseDTO } from "../dto/create-booking.dto";
export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user: CreateUserResponse = await userService.createUserService(name);
  return res.status(201).json(user);
};
export const getUsers = async (req: Request, res: Response) => {
  const users: GetUserResponse[] = await userService.getUsersService();
  return res.status(200).json(users);
};
export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const user: GetUserResponse = await userService.getUserByIdService(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).send(Messages.USER_NOT_FOUND);
};
export const borrowBook = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  const bookId = parseInt(req.params.bookId, 10);

  let result: CreateBookingResponseDTO = await bookService.createBooking(
    userId,
    bookId
  );
  const response =
    result?.status === 400
      ? { message: Messages.ALREADY_BORROWED }
      : { message: Messages.BORROWED_SUCCESSFULLY };

  res.status(result.status).json(response);
};
export const returnBook = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  const bookId = parseInt(req.params.bookId, 10);
  const score = parseInt(req.body.score, 10);
  const returnedBookingScore: number | null = await bookService.returnBooking(
    userId,
    bookId,
    score
  );
  res.json(returnedBookingScore);
};
