export interface CreateBookingResponseDTO {
  status: number;
  message?: string;
  newBooking?: {
    id: number;
    userId: number;
    bookId: number;
    borrowedAt: Date;
    returnedAt: Date | null;
    score: number | null;
  };
}
