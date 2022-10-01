import { Router } from 'express';
import MatchesController from '../controllers/matchController';
import MatchesService from '../services/matchService';
import MatchesRepository from '../repository/matchRepository';
import Jwt from '../middlewares/auth';

const route = Router();

const jwt = new Jwt();

const matches = new MatchesRepository();
const matchesService = new MatchesService(matches);
const matchesController = new MatchesController(matchesService);

route.get('/matches', matchesController.getMatches.bind(matchesController));
route.post('/matches', jwt.validate, matchesController.postMatches.bind(matchesController));
route.patch('/matches/:id/finish', matchesController.patchMatch.bind(matchesController));
route.patch('/matches/:id', matchesController.patchMatchInProgress.bind(matchesController));

export default route;
