import { Cloudinary } from '@cloudinary/url-gen';
import express from 'express';
import { getEnding, incrementEnding } from '../lib/db.js';

export const endRouter = express.Router();

const endings = ['home'];

async function incrementEndingRoute(req, res, next) {
  const { ending } = req.body;

  if (ending in endings) {
    await incrementEnding(ending);
    return next();
  }

  return res.redirect('/');
}

async function endRoute(req, res) {
  const { ending } = req.body;

  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image('https://assets.seniority.in/media/wysiwyg/shutterstock_1230212695.jpg')
    .setDeliveryType('fetch');

  const endingCount = await getEnding(ending);
  console.log(endingCount);

  res.render('end', {
    title: 'Premature retirement',
    imgLink: fetchedImage.toURL(),
    consequence: '',
    description: `
    Instead of doing something exciting with your life, you instead choose to stay at home.
    Years pass and as you grow old you begin to regret not creating any memories for you to look back on.`,
    hasUser: false,
    endingCount,
  });
}

endRouter.get('/:ending', endRoute);
endRouter.post('/:ending', incrementEndingRoute, endRoute);
