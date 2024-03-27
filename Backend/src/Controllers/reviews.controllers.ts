import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sqlConfig";
import { Review } from "../Interfaces/ReviewInterface";

export const createReview = async (req: Request, res: Response) => {
  try {
    let id = v4();

    console.log(id);
    const user_id = req.params.user_id;
    const Specialists_id = req.params.Specialists_id;

    const { Stars, Review }: Review = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);

    if (Stars >= 1 && Stars <= 5) {

      const result = await pool
        .request()
        .input("Review_id", mssql.VarChar, id)
        .input("user_id", mssql.VarChar, user_id)
        .input("Specialists_id", mssql.VarChar, Specialists_id)
        .input("Stars", mssql.Int, Stars)
        .input("Review", mssql.VarChar, Review)
        .execute("createReview");

      if (result.rowsAffected[0] > 0) {
        return res.status(201).json({
          message: "Review submitted successfully",
        });
      } else {
        return res.status(500).json({
          message: "Failed to submit review",
        });
      }
    } else {
      return res.status(400).json({
        message: "Stars must be between 1 and 5.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
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

        let Review = ((await pool.request().input("Review_id", id).execute('getOneReview')).recordset)

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
          .input("Review_id", mssql.VarChar, id)
          .execute("deleteReview")
      ).rowsAffected;

      console.log(result[0]);

      if (result[0] == 0) {
        return res.status(201).json({
          error: "Review not found",
        });
      } else {
        return res.status(200).json({
          message: "Review deleted successfully",
        });
      }
    } catch (error) {
      return res.json({ error });
    }
}

export const bySpecialistsId = async(req: Request, res: Response) =>{
  try{
    const Specialists_id= req.params.id;
    const pool= await mssql.connect(sqlConfig);

    let Reviews = (await pool.request().input("Specialists_id", Specialists_id).execute("specialistReview"))
    .recordset

    if( Reviews.length>0){
      return res.json({
        Reviews
      });
    }else{
      return res.status(404).json({
        message: "No reviews found for this specialist",
      });
    }
  } catch(error){
    console.log("Error in getting data from the database", error);
    return res.status(500).json({
      message: "There was an issue retrieving reviews"
    })
    
  }
};