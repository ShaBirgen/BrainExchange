import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sqlConfig";
import { Category } from "../Interfaces/CategoryInterface";

export const createCategory = async (req: Request, res: Response) => {
  try {
    let id = v4();

    console.log(id);

    const { categoryname, image }: Category = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);

    const validatedresult = (
      await pool
        .request()
        .input("categoryname", mssql.VarChar, categoryname)
        .execute("IfCategoryExists")
    ).recordset;

    console.log("Your result", validatedresult.length);

    if (validatedresult.length >= 1) {
      return res
        .status(201)
        .json({ messageerror: "This Category Name already Exist" });
    } else {
      const result = (
        await pool
          .request()
          .input("category_id", mssql.VarChar, id)
          .input("categoryname", mssql.VarChar, categoryname)
          .input("image", mssql.VarChar, image)
          .execute("createCategory")
      ).rowsAffected;

      console.log(result);
      return res.status(201).json({
        message: `${categoryname} was added succesfully.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};
//get all Categories
export const getallCategories = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
   let allCategories= (await pool.request().execute("getAllCategories")).recordset;
return res.status(200).json({
  Categories: allCategories,
});
  } catch(error) {
    return res.json({error});
  }
};
//get a Category

export const getOneCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const pool= await mssql.connect(sqlConfig);

    let category = (await pool.request().input("category_id", id).execute('getOneCategory')).recordset

    return res.json({
      category
    })
  } catch (error) {
   return res.json({error})
  }
};

//updateCategory

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { categoryname, image } = req.body;

    console.log(req.body);

    const pool= await mssql.connect(sqlConfig);

    let result= (
      await pool
      .request()
      .input("category_id", id)
      .input("categoryname", mssql.VarChar, categoryname)
      .input("image", mssql.VarChar, image)
      .execute("updateCategory")
    ).rowsAffected

    console.log(result);

    return res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    return res.json({error});
  }
};

// deleteCategory
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const pool = await mssql.connect(sqlConfig);

    let result= (
      await pool
      .request
      ()
      .input("category_id", mssql.VarChar, id)
      .execute("deleteCategory")
    ).rowsAffected

    console.log(result[0]);

    if(result[0]==0){
      return res.status(201).json({
        error: "Category not found",
      });
    } else{
      return res.status(200).json({
        message: "Category deleted successfully",
      });
    }
    
  } catch (error) {
   return res.json({error}) ;
   
  }
};
