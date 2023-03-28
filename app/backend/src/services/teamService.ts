import Team from '../database/models/Team';

export default class TeamService {
    public teamModel = Team;

    public async getAllTeams() {
        const result = await this.teamModel.findAll();
        return result;
    }

    public async getTeamById(id: number) {
        const result = await this.teamModel.findByPk(id);
        if (!result) throw new Error('Team not Found');
        return result;
    }
    public async checkTeamMatch(id: number) {
        const result = await this.teamModel.findByPk(id);
        return result;
    }
}