import { Router } from 'express';
import MatchesController from '../controllers/matchController';
import MatchesService from '../services/matchService';
import MatchesRepository from '../repository/matchRepository';
// import Jwt from '../middlewares/auth';

const route = Router();

// const jwt = new Jwt();

const matches = new MatchesRepository();
const matchesService = new MatchesService(matches);
const matchesController = new MatchesController(matchesService);

route.get('/matches', matchesController.getMatches.bind(matchesController));
route.post('/matches', matchesController.postMatches.bind(matchesController));

export default route;