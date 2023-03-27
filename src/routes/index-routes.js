import { Cloudinary } from '@cloudinary/url-gen';
import express from 'express';
import { createUser } from '../lib/users.js';

export const indexRouter = express.Router();

async function startRoute(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  const user = await createUser();
  req.login(user, (err) => {
      if(err) return next(err);
      return next();
  });
  // user.username -> example: 4TXRY
  // Auto generated unique code for your user.

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
    username: user.username,
    destination1: '/adventure/farm',
    option1: 'Let\'s go!',
    method1: 'post',
    destination2: '/end/home',
    option2: 'Stay at home',
    method2: 'post',
  });
}

async function indexRoute(req, res) {
  return res.render('beginning', {
    title: 'Adventure game',
  });
}

indexRouter.get('/', indexRoute);
indexRouter.post('/start',startRoute);
