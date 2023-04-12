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
    return res.redirect(user.location);
  }

  return next();
}

// Makes sure user doesn't skip parts of the adventure
async function chronologicalOrderMiddleware(req, res, next) {
  const { user } = req;

  // Don't trust client side user data! Instead find location from database.
  const { location } = user;

  if (['/adventure/townDay', '/shop/alchemist', '/shop/smith'].includes(location)) {
    return next();
  }

  return res.redirect(location);
}

async function shopPatchRoute(req, res, next) {
  const { shop } = req.params;
  const { user } = req;
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
