import { CorsOptions } from 'cors';

// App messages
export const messages: any = Object.freeze({
    // err messages
    USER_NOT_EXISTS: 'User does not exist!',
    USER_ALREADY_EXIST: 'User already exist!',
    RESETPASSWORD_INVALIDLINK_ERR: 'Invalid Link or expired',
    IMAGE_TYPE_ERR: 'Please provide a jpg/png image!',
    INVALID_CREDENTIALS: 'Invalid email or password',
    OTP_INVALID_ERR: 'OTP is invalid or expired!',
    INVALID_TOKEN_ERR: 'Invalid token',
    ACCESS_DENIED_ERR: 'Access Denied!',
    UNKNOWN_ERR: 'Something went wrong, please try again after some time!',

    // success messages
    FORGOT_PASSWORD_SUCCESS: 'A reset password link is sent to ',
    PASSWORD_UPDATED: 'Password updated!',
    IMAGE_UPLOAD_SUCCESS: 'Image uploaded!',
    USER_UPDATED_SUCCESS: 'User updates successfully',
    LOGIN_SUCCESS: 'Logged in Successfully!',
    REGISTER_SUCCESS: 'Registered Successfully!',
    OTP_SENT_SUCCESS: 'OTP sent to your email',

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