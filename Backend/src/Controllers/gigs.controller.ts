import { Request, Response } from "express";
import { sqlConfig } from "../Config/sqlConfig";
import mssql from "mssql";
import {v4} from "uuid";
import { Gig } from "../Interfaces/GigInterface";


export const createGig= async(req:Request, res:Response) =>{
    try{
       let id = v4();

       console.log((id));
       
       
       const{ user_id, Specialists_id, Description, Deadline, Salary, Duration} : Gig =req.body
       
       console.log(req.body);
       const pool= await mssql.connect(sqlConfig);
        
       const result =(
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
         ).rowsAffected

         console.log(result);
         return res.status(201).json({
            message:"Gig created successfully",
         });

    } catch(err){
        console.log((err));
        return res.sendStatus(500).json({message:err});
    }
};

//GET ALL CATEGORIES

export const getAllGigs= async (req: Request, res:Response)=>{
    try{
        const pool= await mssql.connect(sqlConfig);
        let allGigs= (await pool.request().execute("getAllGigs")).recordset;
        return res.status(200).json({
            Gigs: allGigs,
        });
    } catch(error){
        return res.json({error});
    }
};

//GET ONE CATEGORY

export const getOneGig = async(req:Request, res:Response)=>{
    try{
        const id = req.params.id;

        const pool= await mssql.connect(sqlConfig);

        let Gig = ((await pool.request().input("Gig_id", id).execute('getOneGig')).recordset)

        return res.json({
            Gig
        })
    } catch (error){
        return res.json({error})
    }
};

//UPDATE CATEGORY

export const updateGig= async(req:Request, res:Response)=>{
    try{
        const id = req.params.id;

        const{ user_id, Specialists_id, Description, Deadline, Salary, Duration}= req.body;
        
        console.log("Hello",id);

        const pool= await mssql.connect(sqlConfig);

        let result=(
            await pool
            .request()
            .input("Gig_id", id)
            .input("user_id", user_id)
            .input("Specialists_id", Specialists_id)
            .input("Description", Description)
            .input("Deadline", Deadline)
            .input("Salary", Salary)
            .input("Duration",Duration)
            .execute("updateGig")
        ).rowsAffected

        console.log(result);

        return res.status(200).json({
            message: "Gig updated successfully",
        });
        
    } catch(error){
        return res.json({error});
    }
}

// deleteGig
export const deleteGig = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const pool = await mssql.connect(sqlConfig);

    let result= (
      await pool
      .request()
      .input("Gig_id", mssql.VarChar, id)
      .execute("deleteGig")
    ).rowsAffected

    console.log(result[0]);

    if(result[0]==0){
      return res.status(201).json({
        error: "Gig not found",
      });
    } else{
      return res.status(200).json({
        message: "Gig deleted successfully",
      });
    }
    
  } catch (error) {
   return res.json({error}) ;
   
  }
};
