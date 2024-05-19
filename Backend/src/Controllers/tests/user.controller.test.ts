
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
import { Request } from 'express';
import bcrpyt from "bcrypt";

//test for createUser


// describe('setRole', () => {

//   // Function successfully updates user role in the database
//   it('should update user role in the database when valid parameters are provided', async () => {
//     const req = {
//       params: { id: "123" },
//       body: { Role: "admin" }
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };

//     // Mocking the mssql.connect function
//     const mockPool = {
//       request: jest.fn().mockReturnThis(),
//       input: jest.fn().mockReturnThis(),
//       query: jest.fn().mockResolvedValue({ rowsAffected: 1 })
//     };
//     // jest.spyOn(mssql, 'connect').mockResolvedValue(mockPool);

//     // Calling the setRole function
//     // await setRole(req, res);

//     // Assertions
//     expect(mssql.connect).toHaveBeenCalledWith(sqlConfig);
//     expect(mockPool.request).toHaveBeenCalled();
//     expect(mockPool.input).toHaveBeenCalledWith("user_Id", mssql.VarChar, "123");
//     expect(mockPool.input).toHaveBeenCalledWith("Role", mssql.VarChar, "admin");
//     expect(mockPool.query).toHaveBeenCalledWith("UPDATE Users SET Role = @Role WHERE user_Id = @user_Id");
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ success: "Role set successfully" });
//   });

//   // User_Id parameter is not provided, returns a 500 status code
//   it('should return a 500 status code when User_Id parameter is not provided', async () => {
//     // Mocking the request and response objects
//     const req = {
//       params: {},
//       body: { Role: "admin" }
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };

//     // Calling the setRole function
//     // await setRole(req, res);

//     // Assertions
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
//   });
// });


// describe ( 'set specialists', () =>{
//       // Successfully save specialist information
//       it('should save specialist information successfully when all data is valid', async () => {
//         // Mock request and response objects
//         const req = {
//           params: { id: "user_id" },
//           body: {
//             First_Name: "John",
//             Last_Name: "Doe",
//             Speciality: "Psychology",
//             Rate: 50,
//             Description: "Lorem ipsum dolor sit amet",
//           },
//         };
//         const res = {
//           status: jest.fn().mockReturnThis(),
//           json: jest.fn(),
//         };
  
//         // Mock mssql.connect and pool.request
//         const mockPool = {
//           request: jest.fn().mockReturnThis(),
//           input: jest.fn().mockReturnThis(),
//           execute: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
//         };
//         const mockMssql = {
//           connect: jest.fn().mockResolvedValue(mockPool),
//         };
//         jest.mock('mssql', () => mockMssql);
  
//         // Call the setSpecialist function
//         // await setSpecialist(req, res);
  
//         // Check if the response status and json functions were called correctly
//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith({
//           message: "Your information has been saved successfully.",
//         });
  
//         // Check if mssql.connect and pool.request were called correctly
//         expect(mockMssql.connect).toHaveBeenCalledWith(sqlConfig);
//         expect(mockPool.request).toHaveBeenCalled();
//         expect(mockPool.input).toHaveBeenCalledWith("user_id", "user_id");
//         expect(mockPool.input).toHaveBeenCalledWith("First_Name", "John");
//         expect(mockPool.input).toHaveBeenCalledWith("Last_Name", "Doe");
//         expect(mockPool.input).toHaveBeenCalledWith("Speciality", "Psychology");
//         expect(mockPool.input).toHaveBeenCalledWith("Rate", 50);
//         expect(mockPool.input).toHaveBeenCalledWith("Description", "Lorem ipsum dolor sit amet");
//         expect(mockPool.execute).toHaveBeenCalledWith("SpecialistInfo");
//       });
//     });

describe("Successfully registers a valid user", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
  });

  // Successfully registers a user if the data is valid
  it("Successfully registers a valid user", async () => {
    const req = {
      body: {
        Username: "John Doe",
        Email: "johndoe@gmail.com",
        Password: "!Pa$$w0rd",
        Phone_number: "0720942061"
      }
    }

    jest.spyOn(bcrpyt, "hash").mockResolvedValueOnce("Hashed password - 7gyverf987uygbeuygfyttojnbvc02ugfyhjcj3876f3wh3tce" as never)

    const mockedInput = jest.fn().mockReturnThis;

    const mockedExecute = jest.fn().mockResolvedValueOnce({ rowsAffected: [1] })

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest)
    }

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never)

    await registerUser(req as any, res)
    expect(res.json).toHaveBeenCalledWith({ "success": "Account was created succesfully" })
    expect(res.status).toHaveBeenCalledWith(200)
  })

  // When an empty body is parsed
  // it("Returns an error when an empty body is parsed", () => {
  //   const req = {
  //     body: {}
  //   }

  //   registerUser(req as any, res)

  //   expect(res.json).toHaveBeenCalledWith({ "error": "\"Username\" is not allowed to be empty" })
  //   expect(res.status).toHaveBeenCalledWith(202)
  // })
  // When the Username field is empty
  // it("Returns an error when the Username field is empty", () => {
  //   const req = {
  //     body: {
  //       Username: "",
  //       Email: "johndoe@gmail.com",
  //       Password: "!Pa$$w0rd"
  //     }
  //   }

  //   registerUser(req as any, res)

  //   expect(res.json).toHaveBeenCalledWith({ "error": "\"Username\" is not allowed to be empty" })
  //   expect(res.status).toHaveBeenCalledWith(202)
  // })


  // When the email field is empty
  // it("Returns an error when the email field is empty", () => {
  //   const req = {
  //     body: {
  //       Username: "John Doe",
  //       email: "",
  //       password: "!Pa$$w0rd"
  //     }
  //   }

  //   registerUser(req as any, res)

  //   expect(res.json).toHaveBeenCalledWith({ "error": "\"Email\" is not allowed to be empty" })
  //   expect(res.status).toHaveBeenCalledWith(202)
  // })


  // When password field is empty
  // it("Returns an error when the password field is empty", () => {
  //   const req = {
  //     body: {
  //       Username: "John Doe",
  //       Email: "test123@gmail.com",
  //       Password: ""
  //     }
  //   }

  //   registerUser(req as any, res)

  //   expect(res.json).toHaveBeenCalledWith({ "error": "\"Password\" is not allowed to be empty" })
  //   expect(res.status).toHaveBeenCalledWith(202)
  // })
  // Email field is MIA
  // it("Returns an error when the email field is missing", () => {
  //   const req = {
  //     body: {
  //       Username: "John Doe",
  //       password: "!Pa$$w0rd"
  //     }
  //   }

  //   registerUser(req as any, res)

  //   expect(res.json).toHaveBeenCalledWith({ "error": "\"Email\" is not allowed to be empty" })
  //   expect(res.status).toHaveBeenCalledWith(202)
  // })


  // Password field is MIA
  // it("Returns an error when the password field is missing", () => {
  //   const req = {
  //     body: {
  //       Username: "John Doe",
  //       Email: "johndoe@gmail.com"
  //     }
  //   }

  //   registerUser(req as any, res)

  //   expect(res.json).toHaveBeenCalledWith({ "error": "\"Password\" is not allowed to be empty" })
  //   expect(res.status).toHaveBeenCalledWith(202)
  // })
})



