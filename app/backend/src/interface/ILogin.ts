export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserService {
  login(email: string, password: string): Promise<string | null>;
}

export interface ILoginModel {
  findOneByEmail(email: string): Promise<IUser | null> ;
}

export interface IToken {
  data: {
    id: number;
    role: string;
  }
}
