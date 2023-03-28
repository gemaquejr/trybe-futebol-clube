import * as jwt from 'jsonwebtoken';
import { IToken } from '../interface/ICreateMatch';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

class TokenGenerator {
  static generate(payload: IToken): string {
    const token = jwt.sign(payload, secret, jwtConfig);

    return token;
  }

  static decodedToken(token: string) {
    const decoded = jwt.verify(token, secret);

    return decoded;
  }
}

export default TokenGenerator;
