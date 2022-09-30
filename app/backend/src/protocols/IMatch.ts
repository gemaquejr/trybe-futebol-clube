export interface IMatches {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchesService {
  getMatches(): Promise<IMatches[]>;
}

export interface IMatchesModel {
  getAllMatches(): Promise<IMatches[]>;
}
