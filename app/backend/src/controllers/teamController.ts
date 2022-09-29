import { Request, Response, NextFunction } from 'express';
import { ITeamService } from '../protocols/ITeam';

export default class TeamController {
  constructor(private service: ITeamService) {
    this.service = service;
  }

  public async getTeams(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getTeams();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
