import { Request } from 'express';

export type TokenPayload = {
  id: number;
  role: string;
};

export interface IRequestUser extends Request {
  user?: TokenPayload;
}
