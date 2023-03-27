import { Cloudinary } from '@cloudinary/url-gen';
import express from 'express';
import { ensureLoggedIn } from '../lib/login';

export const adventureRouter = express.Router();

async function adventurePatchRoute(req, res, next) {
  const { adventure } = req.body;

  if (adventure in adventures) {
    return next();
  }

  return res.redirect('/');
}

async function adventureRoute(req, res) {
  const { adventure } = req.body;

  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image('https://assets.seniority.in/media/wysiwyg/shutterstock_1230212695.jpg')
    .setDeliveryType('fetch');

    res.render('adventure', {
      title: 'Adventure start',
      imgLink: fetchedImage.toURL(),
      consequence: '',
      description: `
      Before you lies Mount Ashmoor, rumored to contain unimaginable treasures.
      It beckons you to go on an adventure!`,
      hasUser: false,
      destination1: '/adventure/farm',
      option1: 'Let\'s go!',
      method1: 'post',
      destination2: '/end/home',
      option2: 'Stay at home',
      method2: 'post',
    });
}

adventureRouter.get('/:adventure', adventureRoute);
adventureRouter.patch('/:adventure', ensureLoggedIn, adventurePatchRoute, adventureRoute);
