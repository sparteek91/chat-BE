// Import statements
import { Request, Response } from 'express';
import CryptoJS, { HmacSHA256 } from 'crypto-js';

import { getOtpRequestValidator } from '../../../validators/auth.validator';
import { asyncTryCatch } from '../../../middleware/async-trycatch';
import { IUser, User } from '../../../models/user.model';
import { OTP, IOtp } from '../../../models/otp.modal';
import { otpGenerator } from '../../../utils/helpers/otp-generator';
import { messages } from '../../../utils/constants';

/**
 * Title: OTP Controller
 * @param: req = mobile and action: login/register/forgot password
 * @defination: json payload from FE
 * 
 * @step 1: Validate the incoming request, if error return error response
 * @step 2: Hash the incoming mobile no from request object using hmacSHA256, join it with timestamp('hash'.'now') and save it in OTP document
 * @step 3: If all goes well, send the success response to FE
 */

export const getOtpAction = asyncTryCatch(async (req: Request, res: Response) => {
    // sample req: { mobile: '', action: '' }
    const error = await getOtpRequestValidator(req.body);
    if (error.length) {
        return res.status(400).send({
            status: false,
            message: error[0].message
        });
    }
    
    const user: IUser | null = await User.findOne({ mobile: req.body.mobile });
    if (req.body.action === 'login' || req.body.action === 'forgot') {
        if (!user) {
            return res.status(400).send({
                status: false,
                message: messages.USER_NOT_EXISTS
            });
        }
    } else if (req.body.action === 'registration') {
        if (user) {
            return res.status(400).send({
                status: false,
                message: messages.USER_ALREADY_EXIST
            });
        }
    }

    const hmacSecretKey: string = process.env.HMACSHA256SECRETKEY!;
    const mobile: IUser['mobile'] = req.body.mobile;
    const now: number = Date.now();
    let hash: string = HmacSHA256(mobile, hmacSecretKey).toString(CryptoJS.enc.Hex);
    hash = [hash, now].join('.');

    let otp: IOtp = new OTP({
        hash: hash,
        otp: otpGenerator(),
        createdAt: now
    });
    // save to db
    otp = await otp.save();

    return res.status(200).send({
        status: true,
        data: {
            hash: hash,
            otp: otp.otp,
        },
        message: messages.OTP_SENT_SUCCESS
    });
});