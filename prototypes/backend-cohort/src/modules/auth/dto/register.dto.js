import Joi from "joi"
import BaseDTO from "../../../common/dto/base.dto.js"

class RegisterDto extends BaseDTO {
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string()
            .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
            .min(8)
            .required()
            .messages({
            "string.pattern.base": `Password must have:
            - Minimum 8 characters
            - At least one uppercase letter
            - One lowercase letter
            - One digit
            - One special character`
            }),
        role: Joi.string().valid("customer", "seller").default("customer")
    })
}

export default RegisterDto;