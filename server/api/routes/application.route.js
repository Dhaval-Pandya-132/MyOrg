import express from 'express';
import userController from './../controllers/user.controller';
import orgController from './../controllers/org.controller';
import checkAuth from './../middleware/Oauth';

const router = express.Router();

router.route('/org/:id')
    .get(orgController.getOrg)

router.route('/org')
    .post(orgController.saveOrg);

router.route('/login')
    .post(checkAuth, userController.login);

router.route('/user')
    .get(checkAuth, userController.getUser);

router.route('/')
    .get(checkAuth, userController.getUsers);

export default router;