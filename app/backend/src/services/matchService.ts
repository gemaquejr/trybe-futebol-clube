import { IMatches, IMatchesModel } from '../protocols/IMatch';

export default class MatchesService {
  constructor(private model: IMatchesModel) {
    this.model = model;
  }

  public async getMatches(): Promise<IMatches[]> {
    const matches = await this.model.getAllMatches();
    return matches;
  }
}
