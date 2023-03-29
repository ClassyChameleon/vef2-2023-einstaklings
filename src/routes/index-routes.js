import { Cloudinary } from '@cloudinary/url-gen';
import express from 'express';
import passport, { ensureLoggedIn, logout } from '../lib/login.js';
import { createUser } from '../lib/users.js';

export const indexRouter = express.Router();

async function startRoute(req, res, next) {
  console.log('at start route');

  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image('https://comps.canstockphoto.com/an-open-window-across-the-mountain-eps-vectors_csp18696134.jpg')
    .setDeliveryType('fetch');

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
    method1: 'patch',
    destination2: '/end/home',
    option2: 'Stay at home',
    method2: 'post',
  });
}

async function createUserRoute(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.location !== '/start') {
      return res.redirect(req.user.location);
    }
  }
  console.log(req.user);
  if (req.user) {
    console.log('User exists; not creating new one');
    if (req.user.location !== '/start') {
      console.log('User not at start; redirecting...');
      return res.redirect(req.user.location);
    }
    return next();
  }

  const user = await createUser();
  // user.username -> example: 4TXRY
  // Auto generated unique code for your user.
  req.login(user, (err) => {
      if(err) return next(err);
      return next();
  });

  return next();
}

async function indexRoute(req, res) {
  return res.render('beginning', {
    title: 'Adventure game',
  });
}

async function continueRoute(req, res) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  const { user } = req;

  console.log(user);
  console.log(user.location);

  return res.redirect(user.location);
}

indexRouter.get('/logout', logout, indexRoute);
indexRouter.get('/', indexRoute);
indexRouter.post('/',
  (req, res, next) => {
    console.log(`Continuing as user: ${req.body.username}`);
    return next();
  },
  passport.authenticate('token', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/loginFailed',
  }),
  continueRoute
);
indexRouter.get('/start', ensureLoggedIn, startRoute);
indexRouter.post('/start', createUserRoute, startRoute);
