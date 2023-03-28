import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interface/IMatch';
import ICreateMatch from '../interface/ICreateMatch';

export default class MatchService {
    public matchModel = Match;

    public async getAllMatches() {
        const result = await this.matchModel.findAll({
            include: [
                { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
                { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
            ] } );
        return result;
    }
    public async getMatchesInProgress(inProgress: boolean) {
        const result = await this.matchModel.findAll({
            where: { inProgress },
            include: [
                { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
                { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
            ] }, );
            return result;
    }

    public async findTeam(match: ICreateMatch) {
        const validMatch = await this.matchModel.findOne({ where: { id: match.homeTeam || match.awayTeam } });
        return validMatch;
    }
    public async createMatch(match: ICreateMatch): Promise<object> {
        if (match.homeTeam === match.awayTeam) {
            throw new Error('It is not possible to create a match with two equal teams');
        }
        const result = await this.matchModel.create({
            ...match,
        });
        return result as IMatch;
    }
    public async updateMatch(id: number): Promise<boolean> {
        const result = await this.matchModel.update({ inProgress: false }, {
            where: { id }
        });
        if (!result) {
            return false
        }
        return true;
    }
    public async updateMatchInProgress(id: number, homeGoals: number, awayGoals: number): Promise<boolean> {
        const result = await this.matchModel.update({
            homeTeamGoals: homeGoals,
            awayTeamGoals: awayGoals,
        }, { where: { id, inProgress: true } } );
        return true;
    }
}