import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sqlConfig";
import { Review } from "../Interfaces/ReviewInterface";

export const createReview = async (req: Request, res: Response) => {
  try {
    let id = v4();

    console.log(id);

    const { user_id, Specialists_id, review }: Review = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);

    const result = (
      await pool
        .request()
        .input("user_id", mssql.VarChar, user_id)
        .input("Specialists_id", mssql.VarChar, Specialists_id)
        .input("review", mssql.VarChar, review)
        .execute("createReview")
    ).rowsAffected;

    console.log(result);
    return res.status(201).json({
      message: "Review submitted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

// GET ALL REVIEWS
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    let allReviews = (await pool.request().execute("getAllReviews")).recordset;
    return res.status(200).json({
      Reviews: allReviews,
    });
  } catch (error) {
    return res.json({ error });
  }
};

// GET ONE REVIEW

export const getOneReview = async (req:Request, res: Response)=>{
    try{
        const id = req.params.id;

        const pool= await mssql.connect(sqlConfig);

        let Review = ((await pool.request().input("review_id", id).execute('getOneReview')).recordset)

        return res.json({ Review})

    } catch(error){
        return res.json({error})
    }
};

// DELETE REVIEW 

export const deleteReview = async(req: Request, res:Response) =>{
    try {
      const id = req.params.id;

      const pool = await mssql.connect(sqlConfig);

      let result = (
        await pool
          .request()
          .input("review_id", mssql.VarChar, id)
          .execute("deleteReview")
      ).rowsAffected;

      console.log(result[0]);

      if (result[0] == 0) {
        return res.status(201).json({
          error: "Review not found",
        });
      } else {
        return res.status(200).json({
          message: "Revies deleted successfully",
        });
      }
    } catch (error) {
      return res.json({ error });
    }
}