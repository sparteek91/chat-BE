// Import statements
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { forgetPasswordRequestValidator } from '../../../validators/auth.validator';
import { asyncTryCatch } from '../../../middleware/async-trycatch';
import { IUser, User } from '../../../models/user.model';
import { OTP, IOtp } from '../../../models/otp.modal';
import { messages } from '../../../utils/constants';

/**
 * Title: Forgot password Controller
 * @param: req = mobile, password, otp and hash
 * @defination: json payload from FE
 * 
 * @step 1: Validate the incoming request, if error return error response
 * @step 2: Check if the user with the requested mobile number exists, if not return error response
 * @step 3: Check if the otp and hash exists. if not, return error response
 * @step 4: Encrypt the password using bcrypt, and save the user
 * @step 5: If all goes well, send the success response to FE 
 */

export const forgotPasswordAction = asyncTryCatch(async (req: Request, res: Response) => {
    const error = await forgetPasswordRequestValidator(req.body);
    if (error.length) {
        return res.status(400).send({
            status: false,
            message: error[0].message
        });
    }

    const user: IUser | null = await User.findOne({ mobile: req.body.mobile });
    if (!user) {
        return res.status(400).send({
            status: false,
            message: messages.USER_NOT_EXISTS
        });
    }

    let otp: IOtp | any = await OTP.findOne({ hash: req.body.hash, otp: req.body.otp });
    if (!otp) {
        return res.status(400).send({
            status: false,
            message: messages.OTP_INVALID_ERR
        });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    // save to db
    user.save();

    return res.status(200).send({
        status: true,
        message: messages.PASSWORD_UPDATED
    });
});