import * as bookService from "../bookService";
import { prismaMock } from "../__test__/singleton";

describe("bookService", () => {
  it("should create a new book", async () => {
    prismaMock.book.create.mockResolvedValue({
      id: 16,
      name: "Harry Potter 7",
    });

    const bookData: any = {
      id: 16,
      name: "Harry Potter 7",
    };
    prismaMock.book.create.mockResolvedValue(bookData);

    await expect(bookService.createBookService(bookData)).resolves.toEqual({
      id: 16,
      name: "Harry Potter 7",
    });
  });

  it("should get all books", async () => {
    prismaMock.book.findMany();
    const books = await bookService.getBookService();
    expect(books.length).toBeGreaterThanOrEqual(0);
  });
  it("should get a book by ID", async () => {
    const sampleBook = { id: 1, name: "Harry Potter 1" };
    prismaMock.book.findUnique.mockResolvedValue(sampleBook);
    const book = await bookService.getBookByIdService(1);
    expect(book).toEqual(sampleBook);
  });
  it("should return null if book not found", async () => {
    let result = await bookService.getBookByIdService(75);
    await expect(result).toBe(null);
  });
});
