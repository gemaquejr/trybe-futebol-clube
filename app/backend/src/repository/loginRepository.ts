import Model from '../database/models/User';
import { IUser, ILoginModel } from '../protocols/ILogin';

export default class LoginRepository implements ILoginModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
