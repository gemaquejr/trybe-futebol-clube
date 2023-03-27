import Match from '../database/models/match'
import ILeaderboard from '../interface/ILeaderboard';
import Team from '../database/models/team'
import ITeam from '../interface/ITeam';
import IMatch from '../interface/IMatch';

export default class LeaderboardService {
  public matchModel = Match;
  public teamModel = Team;

  public totalPoints(teamId: number, matches: IMatch[]) {
    const victory = this.victories(teamId, matches);
    const draw = this.draws(teamId, matches);
    const total = (victory * 3) + draw;
    return total;
  }

  public totalGames(teamId: number, matches: IMatch[]) {
    let allGames = 0;
    matches.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if ((homeTeam === teamId) || (awayTeam === teamId))
      allGames += 1;
    })
    return allGames;
  }

  public victories(teamId: number, matches: IMatch[]) {
    let Allvictories = 0;
    matches.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if ((teamId === awayTeam) && (homeTeamGoals < awayTeamGoals)) Allvictories += 1;
      if ((teamId === homeTeam) && (homeTeamGoals > awayTeamGoals)) Allvictories += 1;
    });
    return Allvictories;
  }

  public draws(teamId: number, matches: IMatch[]) {
    let Alldraws = 0;
    matches.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if ((teamId === awayTeam) && (homeTeamGoals === awayTeamGoals)) Alldraws += 1;
      if ((teamId === homeTeam) && (homeTeamGoals === awayTeamGoals)) Alldraws += 1;
    });
    return Alldraws;
  }

  public losses(teamId: number, matches: IMatch[]) {
    let losses = 0;
    matches.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if ((teamId === awayTeam) && (homeTeamGoals > awayTeamGoals)) losses += 1;
      if ((teamId === homeTeam) && (homeTeamGoals < awayTeamGoals)) losses += 1;
    });
    return losses;
  }

  public goalsFavor(teamId: number, matches: IMatch[]) {
    let allGoalsFavor = 0;
    matches.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if (teamId === awayTeam) allGoalsFavor += awayTeamGoals;
      if (teamId === homeTeam) allGoalsFavor += homeTeamGoals;
    });
    return allGoalsFavor;
  }

  public goalsOwn(teamId: number, matches: IMatch[]) {
    let allGoalsOwn = 0;
    matches.forEach(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if (teamId === awayTeam) allGoalsOwn += homeTeamGoals;
      if (teamId === homeTeam) allGoalsOwn += awayTeamGoals;
    });
    return allGoalsOwn;
  }

  public goalsBalance(teamId: number, matches: IMatch[]) {
    const gf = this.goalsFavor(teamId, matches);
    const go = this.goalsOwn(teamId, matches);
    const total = gf - go;
    return total;
  }
  public efficiency(teamId: number, matches: IMatch[]) {
    const points = this.totalPoints(teamId, matches);
    const games = this.totalGames(teamId, matches);
    const efc = ((points / (games * 3)) * 100).toFixed(2);
    return efc.toString();
  }

  public async getLeaderboard(): Promise<ILeaderboard[]> {
    const finishedMatches = await this.matchModel.findAll({ where: { inProgress: false } });
    const allTeams = await this.teamModel.findAll();
    const ultimateLeaderboard = allTeams.map((team: ITeam) => {
      return {
        name: team.teamName,
        totalPoints: this.totalPoints(team.id, finishedMatches),
        totalGames: this.totalGames(team.id, finishedMatches),
        totalVictories: this.victories(team.id, finishedMatches),
        totalDraws: this.draws(team.id, finishedMatches),
        totalLosses: this.losses(team.id, finishedMatches),
        goalsFavor: this.goalsFavor(team.id, finishedMatches),
        goalsOwn: this.goalsOwn(team.id, finishedMatches),
        goalsBalance: this.goalsBalance(team.id, finishedMatches),
        efficiency: this.efficiency(team.id, finishedMatches),
      }
    })
    return ultimateLeaderboard.sort((first, second) => second.totalPoints - first.totalPoints
    || second.totalVictories - first.totalVictories
    || second.goalsBalance - first.goalsBalance
    || second.goalsFavor - first.goalsFavor
    || second.goalsOwn - first.goalsOwn);
  }
}