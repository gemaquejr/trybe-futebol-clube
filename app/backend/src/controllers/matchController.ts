import { Request, Response, NextFunction } from 'express';
import { IMatchesService } from '../protocols/IMatch';

export default class MatchesController {
  constructor(private service: IMatchesService) {
    this.service = service;
  }

  public async getMatches(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.getMatches();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
