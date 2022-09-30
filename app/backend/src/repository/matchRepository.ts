import Model from '../database/models/Match';
import { IMatches, IMatchesModel } from '../protocols/IMatch';
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
}
