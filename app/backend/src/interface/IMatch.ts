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
  patchMatch(id: number): Promise<void>;
  patchMatchInProgress(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
}

export interface IMatchesModel {
  getAllMatches(): Promise<IMatches[]>;
  postOneMatch(data: IMatches): Promise<IMatches | boolean>;
  patchOneMatch(id: number): Promise<void>;
  patchOneMatchInProgress(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
}
