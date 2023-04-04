import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import express from 'express';
import { ensureLoggedIn } from '../lib/login.js';
import {
  getUserLocation,
  updateUserLocation
} from '../lib/users.js';

export const shopRouter = express.Router();

async function shopExistsValidator(req, res, next) {
  const { shop } = req.params;
  const { user } = req;
  if (shop !== 'smith' && shop !== 'alchemist') {
    console.log(`shop '${shop}' not found. Redirecting to last safe location`);
    return res.redirect(user.location);
  }

  return next();
}

// Makes sure user doesn't skip parts of the adventure
async function chronologicalOrderMiddleware(req, res, next) {
  const { user } = req;
  const { shop } = req.params;

  // Don't trust client side user data! Instead find location from database.
  const { location } = await getUserLocation(user.username);
  console.log(location);

  if (shop === 'townDay') {
    return next();
  }

  console.log(`chronological order broken. Redirecting to: ${location}`);
  return res.redirect(location);
}

async function shopPatchRoute(req, res, next) {
  console.log('Shop patch route...');
  const { shop } = req.params;
  const { user } = req;
  console.log(`Entering shop: ${shop}`);
  updateUserLocation(user.username, `/shop/${shop}`);

  return next();
}

async function shopRoute(req, res) {
  const { option } = req.body; // 1 or 2
  const { shop } = req.params;
  const { user } = req;
  const info = [];
  console.log(`Consequence with option: ${option}`)
  console.log(info[`consequence${option}`]);


  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image(info.image)
    .setDeliveryType('fetch')
    .resize(Resize.fill().width(600).height(400));

  return res.render('adventure', {
    title: info.title,
    imgLink: fetchedImage.toURL(),
    consequence: info.consequence,
    description: info.description,
    hasUser: true,
    username: user.username,
    includeStats: true,
    energy: user.energy,
    money: user.money,
    destination1: info.destination1,
    option1: info.option1,
    destination2: info.destination2,
    option2: info.option2,
    disableOption1,
  });
}

shopRouter.get('/:shop',
  ensureLoggedIn,
  chronologicalOrderMiddleware,
  shopExistsValidator,
  shopRoute
);
shopRouter.post('/:adventure',
  ensureLoggedIn,
  chronologicalOrderMiddleware,
  shopExistsValidator,
  shopPatchRoute,
  shopRoute
);
