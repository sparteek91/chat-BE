import { Request, Response, NextFunction } from 'express';

export const asyncTryCatch = (handler: any) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try{
            await handler(req, res);
        }catch(error){
            next(error);
        }
    }
};