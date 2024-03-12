import joi from "joi";

export const registerUserSchema = joi.object({
  Username: joi.string().required(),
  Email: joi.string().email().required(),
  Phone_number: joi.string().optional(),
  Password: joi.string().required(),
});
