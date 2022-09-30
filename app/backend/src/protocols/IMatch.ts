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
  postMatches(data: IMatches): Promise<IMatches | boolean>;
}

export interface IMatchesModel {
  getAllMatches(): Promise<IMatches[]>;
  postOneMatch(data: IMatches): Promise<IMatches | boolean>;
}
