import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
    constructor(private matchService = new MatchService()) {}

    async getAllMatches(_req: Request, res: Response) {
        const matches = await this.matchService.getAllMatches();
        return res.status(200).json(matches);
    }
    async getMatchesInProgress(req: Request, res: Response) {
        const { inProgress } = req.query;
            if (!inProgress) {
                return this.getAllMatches(req, res);
            }
            const progress = (inProgress === 'true');
            const result = await this.matchService.getMatchesInProgress(progress);
            return res.status(200).json(result);
    }
    async createMatch(req: Request, res: Response) {
        try {
            const validHomeTeam = await this.matchService.findTeam(req.body)
            if (!validHomeTeam) return res.status(404).json({ message: 'There is no team with such id!'})
            const result = await this.matchService.createMatch(req.body);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(401).json({ message: error.message})
        }
    }
     async updateMatch(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.matchService.updateMatch(Number(id));
        if (!result) {
            res.status(500).json({ message: 'Failed to update'})
        }
        return res.status(200).json({message: 'Finished'});
    }
    async updateMatchInProgress(req: Request, res: Response) {
        const { id } = req.params;
        const { inProgress } = req.query;
        const { homeTeamGoals, awayTeamGoals } = req.body;
        try {
            const result = await this.matchService.updateMatchInProgress(Number(id), homeTeamGoals, awayTeamGoals);
            return res.status(200).json({ message: 'Updated successfully'})
        } catch (error) {
            return res.status(500).json({ message: 'Error'})
        }
    }

}