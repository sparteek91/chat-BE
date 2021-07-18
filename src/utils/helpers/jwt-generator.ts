import jwt from 'jsonwebtoken';

export const generatejwtToken = (payload: any): string => {
    const jwtPrivateKey: string = process.env.JWTPRIVATEKEY!;
    const jwtToken = jwt.sign(payload, jwtPrivateKey);
    return jwtToken;
}

export const decodeJwt = (token: string) => {
    return jwt.decode(token);
}