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
    .put(checkAuth, eventController.updateEvent);
router.route('/event/:eventId')
    .delete(checkAuth, eventController.deleteEvent);

//  Google calendar events 

router.route('/googleEvents')
    .get(checkAuth, eventController.getGoogleCalendarEvents);
router.route('/googleEvent')
    .post(checkAuth, eventController.addGoogleCalendarEvent);
router.route('/googleEvent/:eventId')
    .put(checkAuth, eventController.updateGoogleCalendar)
    .delete(checkAuth, eventController.deleteGoogleEvent);


export default router;