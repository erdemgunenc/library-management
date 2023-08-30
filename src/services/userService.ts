import prisma from "./db";
import { LogService } from "./logService";
import { Messages } from "../utils/constants";
import { CreateUserResponse, GetUserResponse } from "../dto/user.dto";
import { BorrowBookServiceDTO } from "../dto/borrow.dto";
import { ReturnBookServiceDTO } from "../dto/return.dto";
import { Booking } from "@prisma/client";

export const createUserService = async (
  name: string
): Promise<CreateUserResponse> => {
  LogService("createUserService", Messages.CREATING_USER_WITH_NAME + name);
  return await prisma.user.create({
    data: {
      name,
    },
  });
};

export const getUsersService = async () => {
  LogService("getUsersService", Messages.FETCHING_USERS);
  return await prisma.user.findMany();
};

export const getUserByIdService = async (
  id: number
): Promise<GetUserResponse> => {
  LogService("getUserByIdService", Messages.FETCHING_USER_WITH_ID + id);
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const borrowBookService = async (
  dto: BorrowBookServiceDTO
): Promise<Booking> => {
  const { userId, bookId } = dto;

  LogService(
    "borrowBookService",
    Messages.BORROWING_BOOK_FOR_USERID + userId + Messages.BOOK_ID + bookId
  );
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { books: true },
  });
  if (!user) {
    throw new Error(Messages.USER_NOT_FOUND);
  }

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    throw new Error(Messages.BOOKING_NOT_FOUND);
  }

  const borrowedBook = await prisma.booking.create({
    data: {
      userId: user.id,
      bookId: book.id,
    },
  });

  return borrowedBook;
};
export const returnBookService = async (dto: ReturnBookServiceDTO) => {
  const { userId, bookId, userScore } = dto;
  LogService(
    "returnBookService",
    Messages.RETURNING_BOOK_FOR_USERID + userId + Messages.BOOK_ID + bookId
  );
  const updatedBook = await prisma.book.update({
    where: { id: bookId },
    data: { userScore },
  });

  await prisma.booking.delete({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });
  return updatedBook;
};
