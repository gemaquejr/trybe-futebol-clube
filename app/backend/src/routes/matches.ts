import { Router } from 'express';
import MatchesController from '../controllers/matchController';
import MatchesService from '../services/matchService';
import MatchesRepository from '../repository/matchRepository';

const route = Router();

const matches = new MatchesRepository();
const matchesService = new MatchesService(matches);
const matchesController = new MatchesController(matchesService);

route.get('/matches', matchesController.getMatches.bind(matchesController));

export default route;
