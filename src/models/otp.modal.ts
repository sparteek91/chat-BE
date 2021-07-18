// Import Statements
import mongoose, { Schema, Document } from 'mongoose';

/**
 * Title: OTP Schema
 * @param: hash
 * @defination: string type hash using time and mobile number of the user
 * @param: otp
 * @defination: string type otp sent to the user, It will expires after 2 minute
 */

const otpSchema: Schema = new mongoose.Schema({
    hash: { type: String },
    otp: { type: String }
}, { timestamps: true });

export interface IOtp extends Document {
    hash: string,
    otp: string
}

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });
export const OTP = mongoose.model<IOtp>('Otp', otpSchema);