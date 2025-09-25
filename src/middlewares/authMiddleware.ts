    import jwt, { JwtPayload } from "jsonwebtoken";
    import type { Request, Response,NextFunction } from 'express';
    import { validationResult } from 'express-validator';
    /**
     * Middleware to handle validation errors from express-validator
     */
    export const validateRequest = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return first error message or the whole array
        return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
        });
    }

    next();
    };




const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export interface AuthRequest extends Request{
    user?:string | JwtPayload
}


export const authenticate=(req:AuthRequest,res:Response,next:NextFunction)=>{

    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

     if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
     }

     try{
            const decoded=jwt.verify(token,JWT_SECRET);
            req.user=decoded;
            next();
     }catch(error){
        return res.status(401).json({ success: false, message: "Invalid token" });
     }
}