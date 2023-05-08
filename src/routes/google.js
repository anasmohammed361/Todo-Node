import { Router } from "express";
import passport from "passport";

const googleRouter = Router()

googleRouter.get('/',
  passport.authenticate('google', { scope: ['profile'] }));

googleRouter.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

export default googleRouter