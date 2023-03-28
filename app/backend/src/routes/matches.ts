import { Router } from 'express';
import validateCreation from '../middlewares/validateCreation';
import MatchController from '../controllers/matchController';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', (req, res) => matchController.getMatchesInProgress(req, res));
matchRouter.post('/', validateCreation, (req, res) => matchController.createMatch(req, res));
matchRouter.patch('/:id/finish', (req, res) => matchController.updateMatch(req, res));
matchRouter.patch('/:id', (req, res) => matchController.updateMatchInProgress(req, res));

export default matchRouter;