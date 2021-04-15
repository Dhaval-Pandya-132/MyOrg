import express from 'express';
import userController from './../controllers/user.controller';
import checkAuth from './../middleware/Oauth';

const router = express.Router();


router.route('/test')
    .get(checkAuth, userController.test);

router.route('/login')
    .get(checkAuth, userController.login);

router.route('/user')
    .get(checkAuth, userController.getUser);

router.route('/')
    .get(checkAuth, userController.getUsers);

export default router;