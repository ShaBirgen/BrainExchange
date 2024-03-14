import Joi from "joi";

export const categorySchema = Joi.object({
  industryName: Joi.string().required(),
});
