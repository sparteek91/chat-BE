import { CorsOptions } from 'cors';

// App messages
export const messages: any = Object.freeze({
    // err messages
    USER_NOT_EXISTS: 'User does not exist!',
    USER_ALREADY_EXIST: 'User already exist!',
    RESETPASSWORD_INVALIDLINK_ERR: 'Invalid Link or expired',
    IMAGE_TYPE_ERR: 'Please provide a jpg/png image!',
    INVALID_CREDENTIALS: 'Invalid mobile number or password',
    OTP_INVALID_ERR: 'OTP is invalid or expired!',
    INVALID_TOKEN_ERR: 'Invalid token',
    ACCESS_DENIED_ERR: 'Access Denied!',
    UNKNOWN_ERR: 'Something went wrong, please try again after some time!',

    // success messages
    LOGIN_SUCCESS: 'Logged in successfully!',
    REGISTER_SUCCESS: 'Registered successfully!',
    OTP_SENT_SUCCESS: 'OTP sent successfully!',
    PASSWORD_UPDATED: 'Password updated successfully!',
    IMAGE_UPLOAD_SUCCESS: 'Image uploaded!',
    USER_UPDATED_SUCCESS: 'User updates successfully',

    // OTHERS
    MAILTYPE_FORGOT_PASSWORD: 'forgotpassword',
    MAILTYPE_OTP: 'otp',
    ACCOUNT_ALREADY_VERIFIED: 'This account has already been verified!',
});

// CORS options
export const corsOptions: CorsOptions = {
    origin: "*",
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    preflightContinue: false,
};