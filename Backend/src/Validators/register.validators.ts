import joi from "joi";

export const registerUserSchema = joi.object({
  Username: joi.string().required(),
  Email: joi.string().email().required(),
  Phone_number: joi.string().optional(),
  Password: joi.string().required(),
});

export const specialistInfoSchema = joi.object({
  First_Name: joi.string().required(),
  Last_Name: joi.string().required(),
  Speciality: joi.string().required(),
  Rate: joi.number().required(),
  Description: joi.string().required(),
});
