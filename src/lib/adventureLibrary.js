function Adventure(
  title,
  description,
  image,
  option1,
  option2,
  destination1,
  destination2,
  consequence1,
  consequence2,
  previous,
) {
  this.title = title;
  this.description = description;
  this.image = image;
  this.option1 = option1;
  this.option2 = option2;
  this.destination1 = destination1;
  this.destination2 = destination2;
  this.consequence1 = consequence1;
  this.consequence2 = consequence2;
  this.previous = previous;
}

function Patch(energy, money, savedCrow = false, fullRecharge = false) {
  this.energy = energy;
  this.money = money;
  this.savedCrow = savedCrow;
  this.fullRecharge = fullRecharge;
}

const adventures = [];
const adventurePatches = [];

// can recall adventures like:
// const adventureName = 'farm';
// adventures[adventureName];
adventures.farm = new Adventure(
  'Help wanted at the farm',
  `You walk through the grassy meadow where a farmer offers you
  50 money if you spend 50 energy to help around his farm.
  Do you accept? [-50 energy, +50 money]`,
  'https://www.identityrpg.com/community/uploads/monthly_2017_02/farmer2.jpg.53636273cc8accbf88dd6f80bb08056c.jpg',
  'Lets get some money!',
  'Some other time, Farmer',
  '/adventure/meadow',
  '/adventure/meadow',
  'Carrying nothing but your positive attitude, you set off!',
  '',
  '/start',
);

adventurePatches.meadow1 = new Patch(-50, 50);
adventures.meadow = new Adventure(
  'A crow is trapped',
  `You continue your adventure and spot a net hanging from a tree.
  There's a crow trapped inside it!
  Do you free it? [-30 energy]`,
  'https://res.cloudinary.com/ddhokwpkf/image/upload/v1680192760/crow_trapped_in_a_net_luimue.png',
  'Save the crow!',
  'Leave it be',
  '/adventure/bridge',
  '/adventure/bridge',
  `The farmer is grateful for your help and rewards you with 50 money.
  The money weighs heavy in your pockets.`,
  `You decide to save your strength.
  The farmer looks disappointed`,
  '/adventure/farm',
);

adventurePatches.bridge1 = new Patch(-30, 0, true);
adventures.bridge = new Adventure(
  'Troll on a bridge',
  `You come to a bridge where a big brutish troll stops you.
  "Stop! Give me 10 money or you no pass!".
  You can probably swim over the river, but it wont be easy.
  Do you pay the troll or swim across?`,
  'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/troll-on-bridge-stephen-humphries.jpg',
  'Pay the troll 10 money',
  'Go for a swim',
  '/adventure/townNight',
  '/adventure/townNight',
  `As you remove the net from the tree, you trip and fall down. Ouch!.
  You look up and see the crow freed from the net looking down on you from the tree. The crow then flies away`,
  `You decide to play it safe and leave the crow to its fate.
  Who knows, maybe it's an evil wizard.`,
  '/adventure/meadow',
);

adventurePatches.townNight1 = new Patch(0, -10);
adventurePatches.townNight2 = new Patch(-50, 0);
adventures.townNight = new Adventure(
  'A night in town',
  `Exhausted, you enter a town where you can spend 10 money at an inn for a good nights sleep.
  You may also sleep in the streets`,
  'https://cdna.artstation.com/p/assets/images/images/019/635/446/large/marcel-hansen-highresscreenshot00021.jpg',
  'Pay 10 money for a good night\'s rest',
  'My back has suffered worse. [sleep on pavement]',
  '/adventure/townDay',
  '/adventure/townDay',
  `The troll counts the money very slowly.
  He looks up "Have good trip!" and steps aside to let you pass`,
  'Swimming in all your clothes is no easy feat, but you manage. [-50 energy]',
  '/adventure/bridge',
);

adventurePatches.townDay1 = new Patch(0, -10, undefined, true);
adventurePatches.townDay2 = new Patch(+50, 0);
adventures.townDay = new Adventure(
  'Good morning',
  `As the sun rises, the town becomes full of life as people go to work.
  Rumors around town say that a dragon lives in Mount Ashmoor.
  A local blacksmith is selling a dragonslaying sword for 50 money.
  There is also an alchemist who might have something useful. Who do you visit?`,
  'https://cdn1.epicgames.com/ue/product/Screenshot/6-1920x1080-de8fb9d4ca8c06a5d20d93fd35d2c992.jpg',
  'Visit the blacksmith',
  'Visit the alchemist',
  '/shop/smith',
  '/shop/alchemist',
  'The inn was nice and cozy. Energy and health fully restored',
  `You managed to rest up a bit.
  Your back does not appreciate making friends with the rocky pavement`,
  '/adventure/townNight',
);

export { adventurePatches, adventures };

