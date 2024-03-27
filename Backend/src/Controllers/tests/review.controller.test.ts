import mssql from "mssql";
import { Request, Response } from "express";
import { createReview } from "../reviews.controllers";

describe("Review submitted successfully", () => {
  it("should submit a review successfully when valid input is provided", async () => {
    const req = {
      params: {
        user_id: "user123",
        Specialists_id: "specialist123",
      },
      body: {
        Stars: 4,
        Review: "Great experience!",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mssql.connect = jest.fn().mockResolvedValue({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
    });

    await createReview(req as never, res as never );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Review submitted successfully",
    });
  });
});
