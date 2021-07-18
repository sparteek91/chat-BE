// Import statements
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { SignupRequestValidator } from '../../../validators/auth.validator';
import { asyncTryCatch } from '../../../middleware/async-trycatch';
import { User, IUser } from '../../../models/user.model';
import { OTP, IOtp } from '../../../models/otp.modal';
import { messages } from '../../../utils/constants';
import { generatejwtToken } from '../../../utils/helpers/jwt-generator';

/**
 * Title: Register Controller
 * @param: req = mobile, name, countryCode, dialCode, terms, otp, hash, password
 * @defination: json payload from FE
 * 
 * @step 1: Validate the incoming request, if error return error response
 * @step 2: Check if the user already exists. if yes, return error response
 * @step 3: Check if the otp and hash exists. if not, return error response
 * @step 4: Encrypt the password using bcrypt, channge the activeted status to true and save the user
 * @step 5: If all goes well, send the success response to FE that include jwt token
 */

export const signUpAction = asyncTryCatch(async (req: Request, res: Response) => {
    const error = await SignupRequestValidator(req.body);
    if (error.length) {
        return res.status(400).send({
            status: false,
            message: error[0].message
        });
    }

    let user: IUser | any = await User.findOne({ mobile: req.body.mobile });
    if (user) {
        return res.status(400).send({
            status: false,
            message: messages.USER_ALREADY_EXIST
        });
    }

    let otp: IOtp | any = await OTP.findOne({ hash: req.body.hash, otp: req.body.otp });
    if (!otp) {
        return res.status(400).send({
            status: false,
            message: messages.OTP_INVALID_ERR
        });
    }

    user = new User({
        name: req.body.name,
        mobile: req.body.mobile,
        password: req.body.password,
        countryCode: req.body.countryCode,
        dialCode: req.body.dialCode,
        terms: req.body.terms,
    });
    // hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.activeted = true;
    // save to db
    user = await user.save();

    // prepare response obj
    user = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
        countryCode: user.countryCode,
        dialCode: user.dialCode,
        terms: user.terms,
        activeted: user.activeted,
        createdAt: user.createdAt,
        status: user.status,
        _id: user._id
    };
    return res.status(200).send({
        status: true,
        data: user,
        jwtToken: generatejwtToken({ user: user._id }),
        message: messages.REGISTER_SUCCESS
    });
});