function Adventure(
  title,
  description,
  image,
  option1,
  option2,
  destination1,
  destination2,
  consequence1,
  consequence2
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
}

function Patch(energy, money, savedCrow = false) {
  this.energy = energy;
  this.money = money;
  this.savedCrow = savedCrow;
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
  ''
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
  '/adventure/bridge',
  '/end/bridge',
  `As you remove the net from the tree, you trip and fall down. Ouch!.
  You look up and see the crow freed from the net looking down on you from the tree. The crow then flies away`,
  `You decide to play it safe and leave the crow to its fate.
  Who knows, maybe it's an evil wizard.`,
);

export { adventurePatches, adventures };

