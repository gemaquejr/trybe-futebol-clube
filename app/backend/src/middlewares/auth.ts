import { Response, NextFunction } from 'express';
import { IRequestUser } from '../protocols/IRequestUser';
import { IToken } from '../protocols/ILogin';
import TokenGenerator from './tokenGenerator';

class Jwt {
  validate = (req: IRequestUser, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ message: 'Token must be a valid token' });
      const decoded = TokenGenerator.decodedToken(authorization);
      if ((decoded as IToken).data.role !== 'admin') {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      req.user = (decoded as IToken).data;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default Jwt;
