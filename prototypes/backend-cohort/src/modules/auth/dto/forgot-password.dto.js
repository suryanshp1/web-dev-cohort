import BaseDTO from "../../../common/dto/base.dto.js"

class ForgotPasswordDto extends BaseDTO {
    static schema = Joi.object({
        email: Joi.string().email().lowercase().required()
    })
}

export default ForgotPasswordDto;