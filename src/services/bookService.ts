import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Messages } from "../utils/constants";
import { LogService } from "./logService";

export const createBookService = async (bookingData: any) => {
  LogService("createBookService", Messages.CREATING_BOOK);
  return await prisma.book.create({
    data: bookingData,
  });
};

export const getBookService = async () => {
  LogService("getBookService", Messages.FETCHING_BOOKS);
  return await prisma.book.findMany();
};

export const getBookByIdService = async (id: number) => {
  LogService("getBookByIdService", Messages.FETCHING_BOOK_WITH_ID + id);
  return await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
};
export const createBooking = async (userId: number, bookId: number) => {
  const existingBooking = await prisma.booking.findFirst({
    where: {
      userId: userId,
      bookId: bookId,
      isReturned: true,
    },
  });

  if (existingBooking) {
    await prisma.booking.update({
      where: {
        id: existingBooking.id,
      },
      data: {
        returnedAt: null,
        isReturned: false,
        // book is borrowed again.
      },
    });
    return {
      status: 200,
      message: Messages.BOOKING_SUCCESSFULLY,
    };
  }

  const newBooking = await prisma.booking.create({
    data: {
      userId: userId,
      bookId: bookId,
      borrowedAt: new Date(),
    },
  });

  return {
    status: 200,
    message: Messages.BOOKING_SUCCESSFULLY,
    newBooking,
  };
};

export const returnBooking = async (
  userId: number,
  bookId: number,
  score: number
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      userId: userId,
      bookId: bookId,
      returnedAt: null,
    },
  });

  if (!booking) {
    throw new Error(Messages.BOOKING_NOT_FOUND);
  }

  const returnedBooking = await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      returnedAt: new Date(),
      score,
      isReturned: true,
    },
  });

  return returnedBooking.score;
};
