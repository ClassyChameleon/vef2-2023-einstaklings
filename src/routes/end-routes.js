import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import express from 'express';
import { getEnding, incrementEnding } from '../lib/db.js';
import { endings } from '../lib/endingLibrary.js';
import { ensureLoggedIn, logout } from '../lib/login.js';
import { updateUserLocation } from '../lib/users.js';

export const endRouter = express.Router();

async function doYouBelongHereMiddleware(req, res, next) {
  const { user } = req;
  const { ending } = req.params;

  if (user.location !== `/end/${ending}`) {
    return res.redirect(user.location);
  }

  return next();
}

async function endingExistsMiddleware(req, res, next) {
  const { ending } = req.params;

  if (ending in endings) {
    return next();
  }

  return res.redirect('/');
}

async function chronologicalOrderMiddleware(req, res, next) {
  const { user } = req;
  const { ending } = req.params;
  const info = endings[ending];
  const { location } = user;

  if (info.prev.includes(location)) {
    return next();
  }

  return res.redirect(location);
}

async function incrementEndingRoute(req, res, next) {
  const { user } = req;

  const { ending } = req.params;

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

  res.render('end', {
    title: info.title,
    imgLink: fetchedImage.toURL(),
    consequence: '',
    description: info.description,
    hasUser: false,
    endingCount,
  });
}

endRouter.get('/:ending',
  ensureLoggedIn,
  endingExistsMiddleware,
  doYouBelongHereMiddleware,
  logout,
  endRoute
);
endRouter.post('/:ending',
  ensureLoggedIn,
  endingExistsMiddleware,
  chronologicalOrderMiddleware,
  incrementEndingRoute,
  logout,
  endRoute
);
