import express from 'express';
import userController from './../controllers/user.controller';
import checkAuth from './../middleware/Oauth';

const router = express.Router();


router.route('/test')
    .get(checkAuth, userController.test);

export default router;