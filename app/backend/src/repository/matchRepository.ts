import Model from '../database/models/Match';
import { IMatches, IMatchesModel } from '../interface/IMatch';
import Team from '../database/models/Team';

export default class MatchesRepository implements IMatchesModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAllMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  }

  async postOneMatch(data: IMatches): Promise<IMatches | boolean> {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = data;
    const match = await this.model.create(
      { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress },
    );
    return match;
  }

  async patchOneMatch(id: number) {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async patchOneMatchInProgress(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
