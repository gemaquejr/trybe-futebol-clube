import { Request, Response, NextFunction } from 'express';
import { IToken, IUserService } from '../protocols/ILogin';
import TokenGenerator from '../middlewares/tokenGenerator';

export default class LoginController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.service.login(email, password);
      if (!token) return res.status(401).json({ message: 'Incorrect email or password' });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  public async authLogin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({ message: 'Invalid token' });
    try {
      const decoded = TokenGenerator.decodedToken(token) as IToken;
      return res.status(200).json({ role: decoded.data.role });
    } catch (error) {
      next(error);
    }
  }
}
