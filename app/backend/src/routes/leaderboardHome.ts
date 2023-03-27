import { Router } from 'express';

import LeaderboardHomeController from '../controllers/leaderboardController';
import LeaderboardHomeService from '../services/leaderboardHomeService';
import LeaderboardHomeRepository from '../repository/leaderboardHomeRepository';

const route = Router();

const leaderboardHome = new LeaderboardHomeRepository();
const leaderboardHomeService = new LeaderboardHomeService(leaderboardHome);
const leaderboardHomeController = new LeaderboardHomeController(leaderboardHomeService);

route.get(
  '/leaderboard/home',
  leaderboardHomeController.getLeaderboardHome.bind(leaderboardHomeController),
);

export default route;
