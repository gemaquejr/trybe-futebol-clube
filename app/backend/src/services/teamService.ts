import { ITeam, ITeamModel } from '../protocols/ITeam';

export default class TeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  public async getTeams(): Promise<ITeam[]> {
    const teams = await this.model.getAllTeams();
    return teams;
  }

  public async getTeamById(id: number): Promise<ITeam | null> {
    const teams = await this.model.getOneTeamById(id);

    return teams;
  }
}
