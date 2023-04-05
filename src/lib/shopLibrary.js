function Shop(
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

const shops = [];

shops.smith = new Shop(
  'The Humble Blacksmith',
  `You arrive at the Blacksmith's shop.
  On display you see two items: a blunt dagger and a "dragonslaying" sword.
  The dagger is marked 'free', but the dragonslaying sword costs 50g

  The blacksmith doesn't seem very busy so you ask him about these prices
  "Well traveler, this blunt dagger wasn't made by me. Someone left it here and
  I don't feel right charging money for it, especially since I know nothing about it.
  However, this dragonslaying sword is made by me. It's of Valyrian steel, which as you
  might know is very expensive metal, and is the only metal known to cut through dragonskin.
  My hope is that someone takes it and slays the dragon of Mount Ashmoor while it slumbers
  because when it awakens, it is sure to wipe out this village and many more"`,
  'https://www.medievalbrick.com/wp-content/uploads/2022/12/the-position-of-medieval-blacksmith-3.png',
  'Take the mysterious dagger and head to Mount Ashmoor',
  'Buy the dragonslaying sword and head to Mount Ashmoor',
  '/end/dragon',
  '/end/dragonSlayer',
  '',
  '',
  '/adventure/townDay',
);

shops.alchemist = new Shop(
  'The Arrogant Alchemist',
  `You arrive at the Alchemists shop.
  On display you see large variety of potions of different sizes and shapes.

  "Welcome traveler. No doubt you're here to buy some of my great potions.
  Unfortunately, you can't have my potions. They're too strong for you.
  You'll have to find an alchemist that sells weaker potions"

  You note that the shelves around you are labeled and full of potions.
  'Too strong', 'Too strong', 'A little weaker, but still too strong'
  on one shelf labeled 'Weak enough for adventurers' you find only a single potion.
  'Invisibility potion, 100g'.

  You pick it up and ask:
  "Alchemist, what about this potion?"
  "Why a weak invisibility potion? I wont hand it to a stranger like you.
  How do I know you wouldn't use it to steal the rest of my potions?
  Be gone! You have no business here! You can't handle my potions!"

  He gestures for you to leave.
  It seems he doesn't want to sell you anything`,
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2adb800f-68e0-4d63-99d1-2a9cd966ffbd/dc886ho-c117ec95-5292-47c2-a43a-bfc5c99492af.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhZGI4MDBmLTY4ZTAtNGQ2My05OWQxLTJhOWNkOTY2ZmZiZFwvZGM4ODZoby1jMTE3ZWM5NS01MjkyLTQ3YzItYTQzYS1iZmM1Yzk5NDkyYWYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.HwAzB-yayW6H_0kNwjJs9w69lyDsNANDn1d3wnXmN08',
  'Take the mysterious dagger and head to Mount Ashmoor',
  'Buy the dragonslaying sword and head to Mount Ashmoor',
  '/end/dragon',
  '/end/dragonSlayer',
  '',
  '',
  '/adventure/townDay',
);

export { shops };
