
import mssql from "mssql";
import {
  registerUser,
  getOneUser,
  getAllUsers,
  deleteUser,
  updateUser,
  setRole,
  setSpecialist,
} from "../user.controller";
import { sqlConfig } from "../../Config/sqlConfig";
import { Request, json } from 'express';
import bcrpyt from "bcrypt";


describe ("Successfully gets all user", () =>{
  
  let res : any;
  beforeEach(()=>{
    res ={
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    }
  });
  it("Gets all uers", async()=>{
    const req ={
      body :{}
    }
    const mockUsers =[
      {
          userId: "282165eb-985a-47ed-a874-616ef3396f44",
          fullName: "kenny maina",
          email: "kennynet66@gmail.com",
          password: "$2b$05$9Xt0PP67/Qy2d5oyLPhFdeGvUM0k6igjKtijiyR9FrCtMZ5zHkeDW",
          role: "user",
          isAdmin: false,
          isVerified: false,
          isWelcomed: false,
          profileImg: "https://picsum.photos/721/400"
        },
        {
          userId: "2ba12349-20fe-4d9a-8773-55f0c51b8df1",
          fullName: "sandra",
          email: "sandra2@gmail.com",
          password: "$2b$05$jpNJhz4.Fy0GJF1nnxl09.bvNAar1YI0hfHRj0u5CQkEl.hYx6OW6",
          role: "user",
          isAdmin: false,
          isVerified: true,
          isWelcomed: true,
          profileImg: "https://picsum.photos/721/400"
        },
        {
          userId: "373a0664-9937-4a1c-b263-c55ac4c4d71a",
          fullName: "bill gates",
          email: "gillgates@gmail.com",
          password: "$2b$05$41vZvHmwbvn26Vvy1a.xxeDmVoI24BdOLcQS1qlpXshZXJlnq1S1i",
          role: "user",
          isAdmin: false,
          isVerified: true,
          isWelcomed: true,
          profileImg: "http://res.cloudinary.com/dtvrzfi1b/image/upload/v1712052441/fqjmyu1vovcdzeokxv8c.jpg"
      }
    ]

    const mockedPool ={
      request:{
        request: jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({recordSet: mockUsers})
      }
    };

    jest.spyOn(mssql, 'connect'). mockRejectedValueOnce(mockedPool as never);

    await getAllUsers( req as any, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
})
