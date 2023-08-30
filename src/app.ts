import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { rateLimiter } from "./middlewares/rateLimitter";
import { errorHandler } from "./middlewares/errorHandler";

import * as userController from "./controllers/userController";
import * as bookController from "./controllers/bookController";
import { body, validationResult, param } from "express-validator";
import validationErrorHandler from "./middlewares/validationErrorHandler";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(rateLimiter);

app.post(
  "/users",
  body("name").isString().notEmpty(),
  validationErrorHandler,
  userController.createUser
);
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.post(
  "/users/:userId/borrow/:bookId",
  [param("userId").isInt().notEmpty(), param("bookId").isInt().notEmpty()],
  validationErrorHandler,
  userController.borrowBook
);
app.post(
  "/users/:userId/return/:bookId",
  [param("userId").isInt().notEmpty(), param("bookId").isInt().notEmpty()],
  validationErrorHandler,
  userController.returnBook
);

app.get("/books", bookController.getAllBooks);
app.get("/books/:id", bookController.getBookById);
app.post(
  "/books",
  body("name").isString().notEmpty(),
  validationErrorHandler,
  bookController.createNewBook
);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
