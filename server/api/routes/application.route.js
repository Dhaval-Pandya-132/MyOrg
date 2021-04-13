import express from 'express';
import userController from './../controllers/user.controller';
import eventController from './../controllers/events.controller';
import checkAuth from './../middleware/Oauth';

const router = express.Router();

router.route('/test')
    .get(checkAuth, userController.test);


// Events Routes 
router.route('/events')
    .get(checkAuth, eventController.getEvents);
router.route('/event')
    .post(checkAuth, eventController.insertEvent);
router.route('/event/:id')
    .put(checkAuth, eventController.updateEvent)
    .delete(checkAuth, eventController.deleteEvent);

export default router;