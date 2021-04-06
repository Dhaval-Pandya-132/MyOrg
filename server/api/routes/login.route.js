import express from'express';
import passport from 'passport';
import isLoggedIn from './../middleware/auth';
const router = express.Router();


router.get("/auth",
            passport.authenticate('google', { scope: ['profile', 'email','https://www.googleapis.com/auth/calendar'] })
);

router.get("/auth/error", (req, res) => res.send('Unknown Error'));

router.get('/api/account/google', passport.authenticate('google', { failureRedirect: '/auth/error' }),
            function(req, res) {
            res.redirect('/');
            }
);

router.get('/', isLoggedIn,(req, res) => res.send(`Welcome ${req.user.displayName}! \n ${req.user.photos['value']}`));

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

export default router;
