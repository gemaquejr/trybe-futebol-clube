import { Router } from 'express';
import LoginController from '../controllers/userController';
import LoginService from '../services/userService';
import LoginRepository from '../repository/loginRepository';
import validateLogin from '../middlewares/validateLogin';

const route = Router();

const login = new LoginRepository();
const loginService = new LoginService(login);
const loginController = new LoginController(loginService);

route.post('/login', validateLogin.validateLogin, loginController.login.bind(loginController));
route.get('/login/validate', loginController.authLogin.bind(loginController));

export default route;
