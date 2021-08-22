// Import statements
import express, { Router } from 'express';
import { loginAction } from '../controllers/auth-controller/login.controller';
import { signUpAction } from '../controllers/auth-controller/signup.controller';
import { getOtpAction } from '../controllers/auth-controller/otp.controller';
import { forgotPasswordAction } from '../controllers/auth-controller/forgot-password.controller';

const router: Router = express.Router();

// routes
export = router
    .post('/login', loginAction)                        // login method
    .post('/signup', signUpAction)                      // signup method
    .post('/getotp', getOtpAction)                      // get otp method
    .post('/forgot-password', forgotPasswordAction)     // forgot password method