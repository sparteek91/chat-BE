// Import statements
const Joi = require('joi');
import { schemaOption } from '../utils/helpers/schema-options';

/**
 * Title: Login Request Validator
 * @param req 
 * @defination: Validates in incoming request for login
 * @return Array of validation error
 */
export const loginRequestValidator = (req: any) => {
    const schema = {
        mobile: Joi.string().min(8).required().max(15),
        password: Joi.string().min(6).required(),
    };
    const validate: Promise<any> = Joi.validate(req, schema, schemaOption);

    return validate.catch(err => {
        return err.details;
    });
};

/**
 * Title: Signup Request Validator
 * @param req 
 * @defination: Validates in incoming request for signup
 * @return Array of validation error
 */
export const SignupRequestValidator = (req: any) => {
    // { name: '', mobile: '', password: '', countryCode: '', dialCode: '', terms: '', otp: ''hash: '' }
    const schema = {
        name: Joi.string().min(2).required(),
        mobile: Joi.string().min(8).required().max(15),
        password: Joi.string().min(6).required(),
        countryCode: Joi.string().min(2).required(),
        dialCode: Joi.string().min(2).required(),
        terms: Joi.required(),
        otp: Joi.required(),
        hash: Joi.required(),
    };
    const validate: Promise<any> = Joi.validate(req, schema, schemaOption);

    return validate.catch(err => {
        return err.details;
    });
};

/**
 * Title: Get OTP Request Validator
 * @param req 
 * @defination: Validates in incoming request for signup
 * @return Array of validation error
 */
export const getOtpRequestValidator = (req: any) => {
    const schema = {
        mobile: Joi.string().min(8).required().max(15)
    };
    const validate: Promise<any> = Joi.validate(req, schema, schemaOption);

    return validate.catch(err => {
        return err.details;
    });
}