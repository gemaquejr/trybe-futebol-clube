import { IMatches, IMatchesModel } from '../protocols/IMatch';

export default class MatchesService {
  constructor(private model: IMatchesModel) {
    this.model = model;
  }

  public async getMatches(): Promise<IMatches[]> {
    const matches = await this.model.getAllMatches();
    return matches;
  }

  public async postMatches(data: IMatches): Promise<IMatches | boolean> {
    const match = await this.model.postOneMatch(data);
    return match;
  }
}
