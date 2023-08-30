import * as userService from "../userService";
import { prismaMock } from "../__test__/singleton";

describe("usersService", () => {
  it("should create a new user", async () => {
    prismaMock.user.create.mockResolvedValue({
      id: 1,
      name: "Erdem Gunenc",
    });

    const userData: any = {
      id: 1,
      name: "Erdem Gunenc",
    };
    prismaMock.user.create.mockResolvedValue(userData);

    await expect(userService.createUserService(userData)).resolves.toEqual({
      id: 1,
      name: "Erdem Gunenc",
    });
  });

  it("should get all users", async () => {
    prismaMock.user.findMany.mockResolvedValue([
      { id: 10, name: "Erdem Gunenc" },
    ]);
    const users = await userService.getUsersService();
    expect(users.length).toBeGreaterThanOrEqual(0);
  });
  it("should get a user by ID", async () => {
    const sampleUser = { id: 10, name: "Erdem Gunenc" };
    prismaMock.user.findUnique.mockResolvedValue(sampleUser);
    const book = await userService.getUserByIdService(1);
    expect(book).toEqual(sampleUser);
  });
  it("should return null if user not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    let result = await userService.getUserByIdService(75);
    await expect(result).toBe(null);
  });
  it("should borrow successfuly", async () => {
    prismaMock.booking.create.mockResolvedValue({
      id: 1,
      userId: 1,
      bookId: 1,
      borrowedAt: new Date(),
      returnedAt: new Date(),
      score: 1,
      isReturned: false,
    });
    prismaMock.book.create.mockResolvedValue({
      id: 1,
      name: "Harry Potter 1",
    });
    prismaMock.user.create.mockResolvedValue({
      id: 1,
      name: "Erdem Gunenc",
    });
    let result = await userService.borrowBookService({
      userId: 1,
      bookId: 1,
    });
    await expect(result).toBeDefined();
  });
});
