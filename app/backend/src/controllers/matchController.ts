import { Request, Response, NextFunction } from 'express';
import { IMatchesService } from '../protocols/IMatch';
import Team from '../database/models/Team';

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

  public async postMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = req.body;

      const dataHome = await Team.findByPk(homeTeam);
      const dataAwayTeam = await Team.findByPk(awayTeam);
      if (!dataHome || !dataAwayTeam) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      const matches = await this.service.postMatches(
        { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress },
      );
      if (homeTeam === awayTeam) {
        return res.status(401).json({
          message: 'It is not possible to create a match with two equal teams' });
      }
      return res.status(201).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public async patchMatch(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await this.service.patchMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }
}
