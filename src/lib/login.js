import passport from 'passport';
import { UniqueTokenStrategy } from 'passport-unique-token';
import { createUser, findByUsername } from './users.js';

/**
 * Athugar hvort username og password sé til í notandakerfi.
 * Callback tekur við villu sem fyrsta argument, annað argument er
 * - `false` ef notandi ekki til eða lykilorð vitlaust
 * - Notandahlutur ef rétt
 *
 * @param {string} token kóðinn sem leiðir að ævintýri
 * @param {function} done Fall sem kallað er í með niðurstöðu
 */
async function strat(token, done) {
  console.log('auth start...');
  try {
    console.log(`Attempting to authenticate: ${token}`);
    const user = await findByUsername(token);
    console.log(`User: ${user.username}`);
    if (!user) {
      return done(null, false);
    }
    console.log('User found');
    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err);
  }
}

// Notum local strategy með „strattinu“ okkar til að leita að notanda
passport.use(new UniqueTokenStrategy(strat));

// getum stillt með því að senda options hlut með
// passport.use(new Strategy({ usernameField: 'email' }, strat));

// Geymum username á notanda í session, það er nóg til að vita hvaða notandi þetta er
passport.serializeUser((user, done) => {
  const token = user.username;
  done(null, token);
});

// Sækir notanda út frá username
passport.deserializeUser(async (token, done) => {
  try {
    const user = await findByUsername(token);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Hjálpar middleware sem athugar hvort notandi sé innskráður og hleypir okkur
// þá áfram, annars sendir á rótina
export function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('isAuthenticated');
    return next();
  }
  console.log('not isAuthenticated');

  return res.redirect('/');
}

export function logout(req, res, next) {
  req.logout((err) => {
    if (err) { return next(); }
    return next();
  });
}

export async function register(req, res, next) {
  const user = await createUser();
    req.login(user, (err) => {
        if(err) return next(err);
        return next();
    });
}

export default passport;
