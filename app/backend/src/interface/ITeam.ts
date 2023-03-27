export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getTeams(): Promise<ITeam[]>;
  getTeamById(id: number): Promise<ITeam | null> ;
}

export interface ITeamModel {
  getAllTeams(): Promise<ITeam[]>;
  getOneTeamById(id: number): Promise<ITeam | null> ;
}
