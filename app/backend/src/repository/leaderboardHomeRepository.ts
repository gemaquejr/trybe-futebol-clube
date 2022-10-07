import Model from '../database/models/Match';
import { ILeaderboardHome, ILeaderboardHomeModel } from '../protocols/ILeaderboardHome';
import Team from '../database/models/Team';
import rankingTeam from '../helpers/leaderboardHome';

export default class LeaderboardHomeRepository implements ILeaderboardHomeModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAllLeaderboardHome(): Promise<ILeaderboardHome[]> {
    const teams = await Team.findAll();

    const scoreboard = await Promise.all(teams.map(async (t) => {
      const match = await this.model.findAll({
        where: { inProgress: false, homeTeam: t.id } });
      return { name: t.teamName, match };
    }));
    const leaderboardHome = scoreboard;

    return rankingTeam(leaderboardHome);
  }
}
