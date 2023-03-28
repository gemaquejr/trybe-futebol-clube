import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const createToken = ( email?: string) => {
  const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '6d' });
  return token;
};

export const tokenValidation = (token: string) => {
  const verified = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  return verified;
}

export default createToken;