import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const validateCreation = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token not found'})
    }
    try {
        const verified = jwt.verify(authorization, JWT_SECRET) as jwt.JwtPayload;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token must be a valid token'})
    }
}  

export default validateCreation;