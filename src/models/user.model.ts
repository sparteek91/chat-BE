// Import Statements
import mongoose, { Schema, Document } from 'mongoose';

/**
 * Title: User Schema
 * @param: name
 * @defination: string type name of the user
 * @param: email
 * @defination: string type email of the user, default to ''
 * @param: mobile
 * @defination: string type mobile number of the user
 * @param: password
 * @defination: string type password of the user which will be encrypted while saving
 * @param: countryCode
 * @defination: string type country code of the user ex: in, us etc
 * @param: dialCode
 * @defination: string type dial code of the country ex: +91, +1
 * @param: terms
 * @defination: boolean associated to the user agreement on our terms
 * @param: avatar
 * @defination: string type path to the user uploaded avatar aka dp aka profile pic, defaults to ''
 * @param: activated
 * @defination: boolean associated with wheather the user has verified their account, defaults to false
 * @param: status
 * @defination: number type associated with status hard delete: 2, soft delete: 1, none: 0, default to 0  
 */

const UserSchema: Schema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true, lowercase: true, default: '' },
    mobile: { type: String, trim: true, unique: true, required: true, minlength: 8, maxlength: 15 },
    password: { type: String, trim: true, required: true, minlength: 6 },
    countryCode: { type: String, trim: true, required: true },
    dialCode: { type: String, trim: true, required: true },
    terms: { type: Boolean, required: true },
    avatar: { type: String, default: '' },
    activeted: { type: Boolean, default: false },
    status: { type: Number, default: 0 }
}, { timestamps: true });

export interface IUser extends Document {
    name: string,
    email: string,
    mobile: string,
    password: string,
    countryCode: string,
    dialCode: string,
    terms: boolean,
    avatar: string,
    activeted?: boolean,
    status?: number
}

export const User = mongoose.model<IUser>('User', UserSchema);