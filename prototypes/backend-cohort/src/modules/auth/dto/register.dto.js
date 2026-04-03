import Joi from "joi"
import BaseDTO from "../../../common/dto/base.dto"

class RegisterDto extends BaseDTO {
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string()
            .pattern("/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/")
            .min(8)
            .required()
            .message(`Has minimum 8 characters in length.
                    At least one uppercase English letter.
                    At least one lowercase English letter.
                    At least one digit.
                    At least one special character.
                    `),
        role: Joi.string().valid("customer", "seller").default("customer")
    })
}

export default RegisterDto;