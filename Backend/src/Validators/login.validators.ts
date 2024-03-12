import joi from "joi";

export const loginUserSchema = joi.object({
  Email: joi.string().email().required(),
  Password: joi.string().required(),
});
