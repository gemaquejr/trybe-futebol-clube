export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getTeams(): Promise<ITeam[]>;
}

export interface ITeamModel {
  getAllTeams(): Promise<ITeam[]>;
}
