import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import express from 'express';
import { getEndings } from '../lib/db.js';
import passport, { ensureLoggedIn, logout } from '../lib/login.js';
import { createUser } from '../lib/users.js';

export const indexRouter = express.Router();

async function startRoute(req, res) {

  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image('https://comps.canstockphoto.com/an-open-window-across-the-mountain-eps-vectors_csp18696134.jpg')
    .setDeliveryType('fetch')
    .resize(Resize.fill().width(600).height(400));

  return res.render('adventure', {
    title: 'Adventure start',
    imgLink: fetchedImage.toURL(),
    consequence: '',
    description: `
    Before you lies Mount Ashmoor, rumored to contain unimaginable treasures.
    It beckons you to go on an adventure!`,
    hasUser: true,
    username: req.user.username,
    includeStats: false,
    destination1: '/adventure/farm',
    option1: 'Let\'s go!',
    destination2: '/end/home',
    option2: 'Stay at home',
    disableOption1: false,
  });
}

async function logoutMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.location === '/start') {
      return res.redirect('/start');
    }

    req.logout((err) => {
      if (err) { return next(); }
      return next();
    });
  }

  return next();
}

async function createUserMiddleware(req, res, next) {

  const user = await createUser();
  // Example: user.username -> 4TXRY
  // Auto generated unique token for your user.

  req.body.token = user.username;

  return next();
}

async function indexRoute(req, res) {
  let message = '';

  // Athugum hvort einhver skilaboð séu til í session, ef svo er birtum þau
  // og hreinsum skilaboð
  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
  }
  return res.render('beginning', {
    title: 'Adventure game',
    message,
  });
}

async function continueRoute(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  const { user } = req;

  return res.redirect(user.location);
}

async function showStats(req, res) {
  const data = await getEndings();

  return res.render('stats', {
    title: 'Statistics about endings',
    endings: data
  });
}

// ===================================
//              ROUTES
// ===================================

indexRouter.get('/logout', logout, (req, res) => res.redirect('/'));
indexRouter.get('/', indexRoute);
indexRouter.post('/',
  (req, res, next) => next(),
  passport.authenticate('token', {
    failureMessage: 'Username token not found',
    failureRedirect: '/',
  }),
  continueRoute
);

indexRouter.get('/start', ensureLoggedIn, startRoute);
indexRouter.post('/start', logoutMiddleware, createUserMiddleware,
  passport.authenticate('token', {
    failureMessage:
    'Token error: couldn\'t authenticate auto-generated token. Please don\'t tell anyone',
    failureRedirect: '/',
  }),
  startRoute
);

indexRouter.get('/stats', showStats);
