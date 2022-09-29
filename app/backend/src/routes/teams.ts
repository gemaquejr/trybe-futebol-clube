import { Router } from 'express';
import TeamController from '../controllers/teamController';
import TeamService from '../services/teamService';
import TeamRepository from '../repository/teamRepository';

const route = Router();

const team = new TeamRepository();
const teamService = new TeamService(team);
const teamController = new TeamController(teamService);

route.get('/teams', teamController.getTeams.bind(teamController));

export default route;
