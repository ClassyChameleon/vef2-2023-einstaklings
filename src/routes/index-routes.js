import { Cloudinary } from '@cloudinary/url-gen';
import express from 'express';

export const indexRouter = express.Router();

async function indexRoute(req, res) {

  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image('https://comps.canstockphoto.com/an-open-window-across-the-mountain-eps-vectors_csp18696134.jpg')
    .setDeliveryType('fetch');

  res.render('adventure', {
    title: 'Adventure start',
    imgLink: fetchedImage.toURL(),
    consequence: '',
    description: `
    Before you lies Mount Ashmoor, rumored to contain unimaginable treasures.
    It beckons you to go on an adventure!`,
    destination1: '/adventure/farm',
    option1: 'Let\'s go!',
    destination2: '/end/home',
    option2: 'Stay at home',
  });
}

indexRouter.get('/', indexRoute);
