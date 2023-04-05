import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import express from 'express';
import { getEnding, incrementEnding } from '../lib/db.js';
import { endings } from '../lib/endingLibrary.js';
import { ensureLoggedIn, logout } from '../lib/login.js';
import { updateUserLocation } from '../lib/users.js';

export const endRouter = express.Router();

async function endingExistsMiddleware(req, res, next) {
  const { ending } = req.params;
  console.log(`ending: ${ending}`);

  if (ending in endings) {
    return next();
  }

  console.log('ending not found: redirecting to /');
  return res.redirect('/');
}

async function incrementEndingRoute(req, res, next) {
  console.log(`req.user: ${req.user.username}`);
  if (req.user === undefined) { return next(); }
  const { user } = req;

  const { ending } = req.params;

  console.log('ending exists; incrementing');
  await incrementEnding(ending);
  updateUserLocation(user.username, `/end/${ending}`);
  return next();
}

async function endRoute(req, res) {
  const { ending } = req.params;
  const info = endings[ending];

  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image(info.image)
    .setDeliveryType('fetch')
    .resize(Resize.scale().width(600).height(400));

  const endingCount = (await getEnding(ending)) -1;
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

endRouter.get('/:ending', endingExistsMiddleware, endRoute);
endRouter.post('/:ending',
  endingExistsMiddleware,
  ensureLoggedIn,
  incrementEndingRoute,
  logout,
  endRoute
);
