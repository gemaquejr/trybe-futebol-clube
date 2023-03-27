import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/leaderboardHomeService';
import LeaderboardAwayService from '../services/leaderboardAwayService';
import LeaderboardService from '../services/leaderboardService';
import ILeaderboard from '../interface/ILeaderboard';

export default class LeaderboardController {
    constructor(
        private leaderboardService = new LeaderboardService(),
        private leaderboardServiceHome = new LeaderboardHomeService(),
        private leaderboardServiceAway = new LeaderboardAwayService()) {}

    async getLeaderboard(req: Request, res: Response) {
        const result = await this.leaderboardService.getLeaderboard();
        return res.status(200).json(result);
    }
    async getLeaderboardHome(req: Request, res: Response) {
        const result = await this.leaderboardServiceHome.getLeaderboard();
        return res.status(200).json(result);
    }
    async getLeaderboardAway(req: Request, res: Response) {
        const result = await this.leaderboardServiceAway.getLeaderboard();
        return res.status(200).json(result);
    }
}