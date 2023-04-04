import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import express from 'express';
import { adventurePatches, adventures } from '../lib/adventureLibrary.js';
import { ensureLoggedIn } from '../lib/login.js';
import {
  getUserLocation,
  getUserMoney,
  updateUserLocation,
  updateUserSavedCrow,
  updateUserStats
} from '../lib/users.js';

export const adventureRouter = express.Router();

async function adventureExistsValidator(req, res, next) {
  const { adventure } = req.params;
  const { user } = req;
  if (!(adventure in adventures)) {
    console.log(`adventure '${adventure}' not found. Redirecting to last safe location`);
    return res.redirect(user.location);
  }

  return next();
}

// Makes sure user doesn't skip parts of the adventure
async function chronologicalOrderMiddleware(req, res, next) {
  const { user } = req;
  const { adventure } = req.params;

  // Don't trust client side user data! Instead find location from database.
  const { location } = await getUserLocation(user.username);
  console.log(location);
  // userLocation = '/adventure/farm', simplerLocation = 'farm'
  const simpleLocation = location.substr(11);
  if (adventure === 'farm' && location === '/start') {
    return next();
  }
  console.log(`${adventures[simpleLocation].previous} ${adventure}`)
  if (adventures[adventure].previous === location ||
      location === `/adventure/${adventure}`) {
    return next();
  }


  console.log(`chronological order broken. Redirecting to: ${location}`);
  return res.redirect(location);
}

async function adventurePatchRoute(req, res, next) {
  console.log('Patch route...');
  const { option } = req.body; // 1 or 2
  const { adventure } = req.params;
  const { user } = req;
  console.log(`Consequence with option: ${option}`);
  updateUserLocation(user.username, `/adventure/${adventure}`);
  console.log(`adventure+option: ${(`${adventure}${option}`) in adventurePatches}`);
  console.log(`adventure+option value: ${`${adventure}${option}`}`);
  if (adventure === 'townNight' && parseInt(option, 10) === 2) {
    console.log('townNight and option 2 accepted');
    const { money } = await getUserMoney(user.username);
    if (money >= 50) {
      return res.redirect(307, '/end/bridge'); // 307 - POST
    }
  }

  if (adventure+option in adventurePatches) {
    const change = adventurePatches[adventure+option];
    user.energy += change.energy;
    user.money += change.money;
    if (change.fullRecharge) user.energy = 100;
    updateUserStats(user.username, user.energy, user.money);
    if (change.savedCrow) updateUserSavedCrow(user.username);
  }

  return next();
}

async function adventureRoute(req, res) {
  const { option } = req.body; // 1 or 2
  const { adventure } = req.params;
  const info = adventures[adventure];
  const { user } = req;
  console.log(`Consequence with option: ${option}`)
  console.log(info[`consequence${option}`]);

  let disableOption1 = false;
  if ((adventure === 'bridge' || adventure === 'townNight') && user.money < 10) {
    console.log('disabled option 1', adventure, user.money);
    disableOption1 = true;
  }

  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image(info.image)
    .setDeliveryType('fetch')
    .resize(Resize.fill().width(600).height(400));

  return res.render('adventure', {
    title: info.title,
    imgLink: fetchedImage.toURL(),
    consequence: info[`consequence${option}`],
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

adventureRouter.get('/:adventure',
  ensureLoggedIn,
  chronologicalOrderMiddleware,
  adventureExistsValidator,
  adventureRoute
);
adventureRouter.post('/:adventure',
  ensureLoggedIn,
  chronologicalOrderMiddleware,
  adventureExistsValidator,
  adventurePatchRoute,
  adventureRoute
);
