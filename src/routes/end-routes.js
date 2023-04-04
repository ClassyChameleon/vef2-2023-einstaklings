import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import express from 'express';
import { getEnding, incrementEnding } from '../lib/db.js';
import { endings } from '../lib/endingLibrary.js';
import { logout } from '../lib/login.js';
import { updateUserLocation } from '../lib/users.js';

export const endRouter = express.Router();

async function incrementEndingRoute(req, res, next) {
  console.log(`req.user: ${req.user.username}`);
  if (req.user === undefined) { return next(); }
  const { user } = req;

  const { ending } = req.params;
  console.log(`ending: ${ending}`);

  if (ending in endings) {
    console.log('ending exists; incrementing');
    await incrementEnding(ending);
    updateUserLocation(user.username, `/end/${ending}`);
    return next();
  }

  console.log('ending not found: redirecting to /');
  return res.redirect('/');
}

async function endRoute(req, res) {
  const { ending } = req.params;
  const info = endings[ending];

  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image(info.image)
    .setDeliveryType('fetch')
    .resize(Resize.fill().width(600).height(400));

  const endingCount = await getEnding(ending);
  console.log(endingCount);

  res.render('end', {
    title: info.title,
    imgLink: fetchedImage.toURL(),
    consequence: '',
    description: info.description,
    hasUser: false,
    endingCount,
  });
}

endRouter.get('/:ending', endRoute);
endRouter.post('/:ending', incrementEndingRoute, logout, endRoute);
