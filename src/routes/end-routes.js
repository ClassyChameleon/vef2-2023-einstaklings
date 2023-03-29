import { Cloudinary } from '@cloudinary/url-gen';
import express from 'express';
import { getEnding, incrementEnding } from '../lib/db.js';
import { logout } from '../lib/login.js';

export const endRouter = express.Router();

const endings = ['home'];

async function incrementEndingRoute(req, res, next) {
  if (req.user === undefined) { return next(); }

  const { ending } = req.params;
  console.log(`ending: ${ending}`);

  if (endings.includes(ending)) {
    console.log('ending exists; incrementing');
    await incrementEnding(ending);
    return next();
  }

  return res.redirect('/');
}

async function endRoute(req, res) {
  const { ending } = req.params;

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
endRouter.post('/:ending', incrementEndingRoute, logout, endRoute);
