import Model from '../database/models/Team';
import { ITeam, ITeamModel } from '../protocols/ITeam';

export default class TeamRepository implements ITeamModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAllTeams(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getOneTeamById(id: number): Promise<ITeam | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}
