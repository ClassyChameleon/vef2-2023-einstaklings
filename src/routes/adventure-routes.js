import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import express from 'express';
import { adventurePatches, adventures } from '../lib/adventureLibrary.js';
import { ensureLoggedIn } from '../lib/login.js';
import { updateUserLocation, updateUserSavedCrow, updateUserStats } from '../lib/users.js';

export const adventureRouter = express.Router();

async function adventureNotExistsValidator(req, res, next) {
  const { adventure } = req.params;
  const { user } = req;
  if (!(adventure in adventures)) {
    console.log(`adventure '${adventure}' not found. Redirecting to last safe location`);
    return res.redirect(user.location);
  }

  return next();
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

  if (adventure+option in adventurePatches) {
    const change = adventurePatches[adventure+option];
    user.energy += change.energy;
    user.money += change.money;
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

  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});
  const fetchedImage = cldInstance
    .image(info.image)
    .setDeliveryType('fetch')
    .resize(Resize.fill().width(600).height(500));

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
  });
}

adventureRouter.get('/:adventure', ensureLoggedIn, adventureNotExistsValidator, adventureRoute);
adventureRouter.post('/:adventure',
  ensureLoggedIn,
  adventureNotExistsValidator,
  adventurePatchRoute,
  adventureRoute
);
