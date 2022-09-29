import * as bcrypt from 'bcryptjs';
import { ILoginModel } from '../protocols/ILogin';
import TokenGenerator from '../middlewares/tokenGenerator';

export default class LoginService {
  constructor(private model: ILoginModel) {
    this.model = model;
  }

  public async login(email: string, password: string): Promise<string | null> {
    const user = await this.model.findOneByEmail(email);

    if (!user) return null;

    const validate = bcrypt.compare(password, user.password);
    if (!validate) return null;

    return TokenGenerator.generate({ data: { role: user.role, id: user.id } });
  }
}
