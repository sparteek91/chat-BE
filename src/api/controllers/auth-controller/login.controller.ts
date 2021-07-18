// Import statements
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { loginRequestValidator } from '../../../validators/auth.validator';
import { asyncTryCatch } from '../../../middleware/async-trycatch';
import { User, IUser } from '../../../models/user.model';
import { messages } from '../../../utils/constants';
import { generatejwtToken } from '../../../utils/helpers/jwt-generator';

/**
 * Title: Login Controller
 * @param: req = mobile, password
 * @defination: json payload from FE
 * 
 * @step 1: Validate the incoming request, if error return error response
 * @step 2: Check if the user exists. if not, return error response
 * @step 3: Validate password using bcrypt.compare, if not, return error response
 * @step 4: If all goes well, send the success response to FE that include jwt token
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
});