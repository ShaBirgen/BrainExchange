import { Request, Response } from "express";
import mssql from "mssql";
import { v4 } from "uuid";
import { sqlConfig } from "../Config/sqlConfig";
import { Gig } from "../Interfaces/GigInterface";

export const createGig = async (req: Request, res: Response) => {
  try {
    let id = v4();
    const user_id= req.params.user_id;
    const Specialists_id= req.params.Specialists_id;

    console.log(id);

    const {
      Description,
      Deadline,
      Salary,
      Duration,
    }: Gig = req.body;

    console.log(req.body);
    const pool = await mssql.connect(sqlConfig);

    const result = (
      await pool
        .request()
        .input("Gig_id", mssql.VarChar, id)
        .input("user_id", mssql.VarChar, user_id)
        .input("Specialists_id", mssql.VarChar, Specialists_id)
        .input("Description", mssql.VarChar, Description)
        .input("Deadline", mssql.VarChar, Deadline)
        .input("Salary", mssql.Int, Salary)
        .input("Duration", mssql.VarChar, Duration)
        .execute("createGig")
    ).rowsAffected;

    console.log(result);
    return res.status(201).json({
      message: "Gig created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

//GET ALL BOOKINGS

export const getAllGigs = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    let allGigs = (await pool.request().execute("getAllGigs")).recordset;
    return res.status(200).json({
      Gigs: allGigs,
    });
  } catch (error) {
    return res.json({ error });
  }
};

//GET ONE BOOKING

export const getOneGig = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const pool = await mssql.connect(sqlConfig);

    let Gig = (await pool.request().input("Gig_id", id).execute("getOneGig"))
      .recordset;

    return res.json({
      Gig,
    });
  } catch (error) {
    return res.json({ error });
  }
};

//UPDATE BOOKING

export const updateGig = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { user_id, Specialists_id, Description, Deadline, Salary, Duration } =
      req.body;

    console.log("Hello", id);

    const pool = await mssql.connect(sqlConfig);

    let result = (
      await pool
        .request()
        .input("Gig_id", id)
        .input("user_id", user_id)
        .input("Specialists_id", Specialists_id)
        .input("Description", Description)
        .input("Deadline", Deadline)
        .input("Salary", Salary)
        .input("Duration", Duration)
        .execute("updateGig")
    ).rowsAffected;

    console.log(result);

    return res.status(200).json({
      message: "Gig updated successfully",
    });
  } catch (error) {
    return res.json({ error });
  }
};

// DELETE BOOKING
export const deleteGig = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const pool = await mssql.connect(sqlConfig);

    let result = (
      await pool
        .request()
        .input("Gig_id", mssql.VarChar, id)
        .execute("deleteGig")
    ).rowsAffected;

    console.log(result[0]);

    if (result[0] == 0) {
      return res.status(201).json({
        error: "Gig not found",
      });
    } else {
      return res.status(200).json({
        message: "Gig deleted successfully",
      });
    }
  } catch (error) {
    return res.json({ error });
  }
};

export const getBySpecialists = async (req: Request, res: Response) => {
  try{
    const Specialists_id = req.params.id;
    const pool= await mssql.connect(sqlConfig);

    let gigs= (await pool.request().input("Specialists_id", Specialists_id).execute("getBySpecialists"))
    .recordset;

    if(gigs.length <= 0){
      return res.status(401).json({
        error: "No orders found",
      });
    }else{
      return res.status(200).json({
        gigs
      })
    } 
  } catch(error){
    console.log("Error getting data from the database", error);
    return res.status(500).json({
      messageerror: "There was an issue retrieving orders",
    })
    
  }
}

export const getByUser = async (req: Request, res: Response) => {
  try{
    const user_id = req.params.id;
    const pool= await mssql.connect(sqlConfig);

    let gigs= (await pool.request().input("user_id", user_id).execute("getByUser"))
    .recordset

    if (gigs.length==0) {
      return res.status(401).json({
        error: "No orders found",
      });
    } else{
      return res.status(200).json({
        gigs
      })
    }
  }catch(error){
    console.log("Error getting data from the database", error);
    return res.status(500).json({
      messageerror: "There was an issue retrieving orders",
    })
  }
}