import { Router } from 'express';
import UserController from '../controllers/userController';
import loginValidation from '../middlewares/loginValidation'

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', loginValidation, (req, res) => userController.loginController(req, res));
userRouter.get('/validate', (req, res) => userController.getLogin(req, res));

export default userRouter;