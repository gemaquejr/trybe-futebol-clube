import { Request, Response, NextFunction } from 'express';
import { ILeaderboardHomeService } from '../protocols/ILeaderboardHome';

export default class LeaderboardHomeController {
  constructor(private service: ILeaderboardHomeService) {
    this.service = service;
  }

  public async getLeaderboardHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboardHome = await this.service.getLeaderboardHome();
      return res.status(200).json(leaderboardHome);
    } catch (error) {
      next(error);
    }
  }
}
