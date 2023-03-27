import { ILeaderboardHome, ILeaderboardHomeModel } from '../interface/ILeaderboardHome';

export default class LeaderboardService {
  constructor(private model: ILeaderboardHomeModel) {
    this.model = model;
  }

  public async getLeaderboardHome(): Promise<ILeaderboardHome[]> {
    const leaderboardHome = await this.model.getAllLeaderboardHome();
    return leaderboardHome;
  }
}
