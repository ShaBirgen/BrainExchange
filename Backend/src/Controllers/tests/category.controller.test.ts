import mssql from "mssql";
import { getallCategories, getOneCategory } from "../category.controller";
import { sqlConfig } from "../../Config/sqlConfig";

jest.mock("mssql");
jest.mock("../../Config/sqlConfig");

  describe("create a category", async ()=>{
    let app: any;
  })

// GETALLCATEGORIES

describe("Get all categories", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("Gets all categories", async () => {
    const expectedCategories = [
      {
        category_id: "1908f955-f392-48ac-99eb-e6d6fc44a61c",
        categoryname: "Designer",
        image: "https://istore.ke/wp-content/uploads/2021/09/iphone-13-pro-max-blue-select.png",
      },
    ];

    (mssql.connect as jest.Mock).mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({ recordset: expectedCategories }),
    } as never);

    const req = {};

    await getallCategories(req as any, res);

    expect(res.json).toHaveBeenCalledWith({ Categories: expectedCategories });
  });
});

// GETONECATEGORY

describe("Get one category", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("Gets a single category", async () => {
    const expectedCategory = {
      category_id: "1908f955-f392-48ac-99eb-e6d6fc44a61c",
      categoryname: "Designer",
      image: "https://istore.ke/wp-content/uploads/2021/09/iphone-13-pro-max-blue-select.png",
    };

    const req = {
      params: {
        id: "1908f955-f392-48ac-99eb-e6d6fc44a61c",
      },
    };

    (mssql.connect as jest.Mock).mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({ recordset: [expectedCategory] }),
    } as never);

    await getOneCategory(req as any, res);

    expect(res.json).toHaveBeenCalledWith({ category: expectedCategory });
  });
});


// //GET PRODUCTS BY CATEGORY ID

// describe("Gets a product by category id", () => {
//   let res: any;
//   let category: any;

//   beforeEach(() => {
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//     };

//     category = {
//       products: [
//           {
//       product_id: "74aeca9b-4b14-4d8d-a94d-ace1b79c78c7",
//       productname: "Miniso",
//       category_id: "1908f955-f392-48ac-99eb-e6d6fc44a61c",
//       quantity: "100",
//       description: "This is headphones",
//       price: "4500",
//       image: "https://d30wkz0ptv5pwh.cloudfront.net/media/magefan_blog/mobile_phone.jpg",
//       isdeleted: false,
//       CategoryName: "Electronics"
//     },
//       ],
//     };
//   });

//   it("gets a single product by category id", async () => {
//     const req = {
//       params: {
//         category_id: "1908f955-f392-48ac-99eb-e6d6fc44a61c",
//       },
//     };
//     (Connection.execute as jest.Mock).mockResolvedValueOnce({
//       recordset: category.product,
//     });

//     await getProductsbyCategoryId(req as any, res);

//     expect(res.json).toHaveBeenCalledWith({ products: category.products });
//   });
// });

// //UPDATE PRODUCT

// describe("updates product", () => {
//   let res: any;
//   let product: any;

//   beforeEach(() => {
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//     };
//     product = {
//       product: [
//         {
//           productname: "Synix Frameless",
//           category_id: "893f6b6f-bbf9-4d92-a41d-2fb36fc6f019",
//           quantity: "23",
//           description: "Frameless Screen",
//           price: "69900",
//           image:
//         "https://img.freepik.com/free-photo/landscape-nature-scene-tv-appliance-generative-ai_188544-12122.jpg?t=st=1709601368~exp=1709604968~hmac=3b81bea2200f2d54e178ac5f7e045c2cd52391e62e1a82e7e7cff9f4087bc87c&w=826",
//         },
//       ],
//     };
//   });

//   it("updates a product", async () => {
//     const req = {
//       params: {
//         id: "353545-43495835-458347575",
//       },
//       body: {
//         productname: "Synix Frameless",
//         category_id: "893f6b6f-bbf9-4d92-a41d-2fb36fc6f019",
//         quantity: "23",
//         description: "Frameless Screen",
//         price: "69900",
//         image:
//         "https://img.freepik.com/free-photo/landscape-nature-scene-tv-appliance-generative-ai_188544-12122.jpg?t=st=1709601368~exp=1709604968~hmac=3b81bea2200f2d54e178ac5f7e045c2cd52391e62e1a82e7e7cff9f4087bc87c&w=826",
//       },
//     };
//     (Connection.execute as jest.Mock).mockResolvedValueOnce({});

//     await updateProduct(req as any, res);

//     expect(res.json).toHaveBeenCalledWith({
//       message: "Product updated successfully",
//     });
//   });
// });

// //DELETES A PRODUCT

//  describe("delete user", () => {
//    let res: any;
//    let product: any;

//    beforeEach(() => {
//      res = {
//        status: jest.fn().mockReturnThis(),
//        json: jest.fn().mockReturnThis(),
//      };
//    });

//    it("delete a user", async () => {
//      const req = {
//        params: {
//          id: "353545-43495835-458347575",
//        },
//      };
//      (Connection.execute as jest.Mock).mockResolvedValueOnce({
//        // recordset: user
//      });

//      await deleteProduct(req as any, res);

//      expect(res.json).toHaveBeenCalledWith({
//        message: "Product deleted Successfully",
//      });
//    });
//  });