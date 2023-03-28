import { tokenValidation } from '../helper/Token';
import User from '../database/models/User';

export default class UserService {
  public userModel = User;

  public async checkLogin(email: string, password: string) {
    const result = await this.userModel.findOne({
      where: { email },
    });
    if (password.length < 7) {
      return null;
    }
    return result;
  }
  public async getLogin(token: string) {
      const { email } = tokenValidation(token);
      const result = await this.userModel.findOne({
        where: { email },
      });
      if (!result) throw new Error('User not Found');
      return result;
  }
}