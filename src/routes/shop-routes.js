import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import express from 'express';
import { ensureLoggedIn } from '../lib/login.js';
import {
  updateUserLocation,
  updateUserVisitedAlchemist
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

  // Don't trust client side user data! Instead find location from database.
  const { location } = user;
  console.log(location);

  if (['/adventure/townDay', '/shop/alchemist', '/shop/smith'].includes(location)) {
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
  const { shop } = req.params;
  const { user } = req;


  const cldInstance = new Cloudinary({cloud: {cloudName: 'ddhokwpkf'}});

  if (shop === 'smith') {
    const image = 'https://www.medievalbrick.com/wp-content/uploads/2022/12/the-position-of-medieval-blacksmith-3.png';
    const fetchedImage = cldInstance
      .image(image)
      .setDeliveryType('fetch')
      .resize(Resize.fill().width(600).height(400));

    return res.render('shopSmith', {
      title: 'The Humble Blacksmith',
      imgLink: fetchedImage.toURL(),
      hasUser: true,
      username: user.username,
      includeStats: true,
      money: user.money,
      visitedAlchemist: user.visitedalchemist,
      savedCrow: user.savedcrow,
    });
  }
  if (shop === 'alchemist') {
    updateUserVisitedAlchemist(user.username);
    console.log(`Did you save the crow? ${user.savedcrow}`);
    const image = 'https://res.cloudinary.com/ddhokwpkf/image/upload/v1680703306/alchemist_fwxpu0.jpg';
    const fetchedImage = cldInstance
      .image(image)
      .setDeliveryType('fetch')
      .resize(Resize.fill().width(600).height(400));

    return res.render('shopAlchemist', {
      title: 'The Arrogant Alchemist',
      imgLink: fetchedImage.toURL(),
      hasUser: true,
      username: user.username,
      includeStats: true,
      money: user.money,
      savedCrow: user.savedcrow,
    });
  }

  console.log(`Shop ${shop} not found. Redirecting to /`);
  return res.redirect('/');
}

shopRouter.get('/:shop',
  ensureLoggedIn,
  chronologicalOrderMiddleware,
  shopExistsValidator,
  shopRoute
);
shopRouter.post('/:shop',
  ensureLoggedIn,
  chronologicalOrderMiddleware,
  shopExistsValidator,
  shopPatchRoute,
  shopRoute
);
