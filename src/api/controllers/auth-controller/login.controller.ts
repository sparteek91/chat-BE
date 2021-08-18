// Import statements
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { loginRequestValidator } from '../../../validators/auth.validator';
import { asyncTryCatch } from '../../../middleware/async-trycatch';
import { User, IUser } from '../../../models/user.model';
import { OTP, IOtp } from '../../../models/otp.modal';
import { messages } from '../../../utils/constants';
import { generatejwtToken } from '../../../utils/helpers/jwt-generator';

/**
 * Title: Login Controller
 * @param: req = mobile, password, logintype
 * @defination: json payload from FE
 * 
 * @step 1: Validate the incoming request, if error return error response
 * @step 2: Check if the user exists(using mobile number). if not, return error response
 * @step 3: Check the request type, if logintype: 0 => password and if logintype: 1 => OTP
 * @step 4: If logintype: 0 => password request, call loginViaPassword in other case loginViaOtp
 * @step 4: Validate password using bcrypt.compare, if not, return error response
 * @step 5: If all goes well, send the success response to FE that include jwt token
 */

export const loginAction = asyncTryCatch(async (req: Request, res: Response) => {
    const error = await loginRequestValidator(req.body);
    if (error.length) {
        return res.status(400).send({
            status: false,
            message: error[0].message
        });
    }

    let user: IUser | null = await User.findOne({ mobile: req.body.mobile });
    if (!user) {
        return res.status(400).send({
            status: false,
            message: messages.USER_NOT_EXISTS
        });
    }
    if (!req.body.logintype) {
        loginViaPassword(req, res, user);
    } else {
        loginViaOtp(req, res, user);
    }
});

/**
 * Title: Login via password
 * @param: req = mobile, password, logintype
 * 
 * @step 1: Validate password using bcrypt.compare, if not, return error response
 * @step 2: If all goes well, send the success response to FE that include jwt token
 */
const loginViaPassword = async (req: Request, res: Response, user: IUser) => {
    try {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({
                status: false,
                message: messages.INVALID_CREDENTIALS
            });
        }

        return res.send({
            status: true,
            data: user,
            jwtToken: generatejwtToken({ user: user._id }),
            message: messages.LOGIN_SUCCESS
        });
    } catch (error: any) {
        console.log(error);
        res.send({
            status: false,
            message: messages.UNKNOWN_ERR,
            data: error
        });
    }
}

/**
 * Title: Login via OTP
 * @param: req = mobile, password, logintype
 * 
 * @step 1: Validate OTP, if not matches, return error response
 * @step 2: If all goes well, send the success response to FE that include jwt token
 */
const loginViaOtp = async (req: Request, res: Response, user: IUser | any) => {
    try {
        let otp: IOtp | any = await OTP.findOne({ hash: req.body.hash, otp: req.body.otp });
        if (!otp) {
            return res.status(400).send({
                status: false,
                message: messages.OTP_INVALID_ERR
            });
        }

        return res.send({
            status: true,
            data: user,
            jwtToken: generatejwtToken({ user: user._id }),
            message: messages.LOGIN_SUCCESS
        });
    } catch(error: any) {
        console.log(error);
        res.send({
            status: false,
            message: messages.UNKNOWN_ERR,
            data: error
        });
    }
}