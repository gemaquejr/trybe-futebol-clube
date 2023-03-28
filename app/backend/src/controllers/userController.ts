
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import createToken from '../helper/Token';
import UserService from '../services/userService';

export default class UserController {
  constructor(private userService = new UserService()) { }

  async loginController(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginUser = await this.userService.checkLogin(email, password);
    if (!loginUser || !bcrypt.compareSync(password, loginUser.password)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = createToken(loginUser.email);
    return res.status(200).json({ token });
  }
  async getLogin(req:Request, res:Response) {
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        return res.status(404).json({ message: 'Token not found' })
      }
      const result = await this.userService.getLogin(authorization)
      return res.status(200).json({ role: result.role })      
    } catch (error: any) {
        return res.status(404).json({ message: error.message})
    }
  }
}