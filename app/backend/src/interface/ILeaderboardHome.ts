import Match from '../database/models/Match';

export interface ILeaderboardHome {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface ILeaderboardHomeService {
  getLeaderboardHome(): Promise<ILeaderboardHome[]>;
}

export interface ILeaderboardHomeModel {
  getAllLeaderboardHome(): Promise<ILeaderboardHome[]>;
}

export interface ILeaderboardMatch {
  name: string;
  match: Match[];
}
