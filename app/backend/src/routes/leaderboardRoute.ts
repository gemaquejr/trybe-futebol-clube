import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const boardRouter = Router();

const leaderboardController = new LeaderboardController();

boardRouter.get('/', (req, res) => leaderboardController.getLeaderboard(req, res));
boardRouter.get('/home', (req, res) => leaderboardController.getLeaderboardHome(req, res));
boardRouter.get('/away', (req, res) => leaderboardController.getLeaderboardAway(req, res));

export default boardRouter;
