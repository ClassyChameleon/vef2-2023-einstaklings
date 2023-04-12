function Ending(title, image, description, prev) {
  this.title = title;
  this.image = image;
  this.description = description;
  this.prev = prev;
}

const endings = [];

endings.home = new Ending(
  'Early Retirement',
  'https://assets.seniority.in/media/wysiwyg/shutterstock_1230212695.jpg',
  `Instead of doing something exciting with your life, you instead choose to stay at home.
  Years pass and as you grow old you begin to regret not creating any memories for you to look back on.`,
  ['/start'],
);

endings.bridge = new Ending(
  'Drowned in greed',
  'https://res.cloudinary.com/ddhokwpkf/image/upload/v1680707390/drownedCut_pr7qx4.jpg',
  `Halfway across the river you become exhausted and sink like a rock.
  With your final breath, you smile with pride for having 50 gold coins in your pocket rather than 40.`,
  ['/adventure/bridge']
);

endings.town = new Ending(
  'An honest attempt',
  'https://images.pexels.com/photos/5341407/pexels-photo-5341407.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  `With no hope of getting past the dragon, you head back home.
  You feel happy knowing that at least you tried to do something special.
  If another adventure comes up, you feel confident that you wont shy away from it.`,
  ['/shop/alchemist', '/shop/smith']
);

endings.dragon = new Ending(
  'Slain by a dragon',
  'https://thumbs.dreamstime.com/b/chewing-cartoon-dragon-full-mouth-vector-illustration-147607400.jpg',
  `With your blunt dagger, you sneak up on the sleeping dragon.
  You poke it with the pointy end, but the blade breaks on impact.
  The dragon wakes up and eats you.`,
  ['/shop/smith']
);

endings.dragonSlayer = new Ending(
  'Slain a dragon',
  'https://swordoficastrastories.files.wordpress.com/2014/11/dragon6_by_benflores-d84ju1c.jpg',
  `With your dragonslaying sword, you sneak up on the sleeping dragon.
  You poke its head with the pointy end and the blade sinks deep into the dragon.
  It lifts its head and lets out a ghastly screech as it bellows fire.
  You hold the sword firmly as you slide down along the dragons neck, slicing along the way.
  As you reach the end of the neck, the screeching and fires die down, and so does the dragon.

The dragon is slain, and the treasure is yours!

You are hailed as a hero, the king grants you a life of luxury and a feast is held in your honor.
In the end, you are happy that you decided to go on an adventure and in your elder years you are content with your legacy.`,
['/shop/smith']
);

endings.kingsCrown = new Ending(
  'Invisibility potion',
  'https://res.cloudinary.com/ddhokwpkf/image/upload/v1680704852/Crowpotion_nezgij.png',
  `You leave the village disappointed.
  As you're about to give up and head home, a familiar crow lands in front of you holding the invisibility potion from the alchemist.
  You hold your hand out and the crow drops the potion in your hand and flies away. They sure are smart creatures

  You head off to Mount Ashmoor as you are sure this potion will help you get some treasure.
  As you approach the dragon, you gulp down your invisibility potion.
  It really works, you are invisible!
  Seems that everything you touch also becomes invisible, including your clothes.
  As you sneak by the slumbering dragon, it wakes up.
  You stand still and hear your heartbeat pulsing quickly.
  The dragon scans the room and goes back to sleep.
  You sneak by and enter the treasure room

It's an enormous cave, mostly comprised of gold coins with some gems and pearls scattered about.
In the center sits a massive golden egg. You wonder if it's a hollow decoration or truly golden.
It's warm to the touch. My goodness it's a dragon egg!
Touching the egg turns it invisible. You wonder if you can sneak it out.
You look around the treasure room and note that this dragon egg is the most valuable thing here.
You hold the dragon egg and it turns invisible. It's heavy.

The dragon doesn't suspect a thing as you slowly leave with their egg.
You walk out the cave exhausted. You put the egg down, unsure if you can carry it back.
You spot a familiar crow in the sky flying towards you carrying a golden crown.
By the gods, this is a King's Crown! Where did it get that?
The crow drops it near you.

Several guards of the king arrive later and you explain yourself.
They help you carry the egg to the palace where you are greeted with cheers.
The king is pleased and tells you that this will secure the kingdom's future.
He grants you a life of luxury and holds a feast in your honor.
In the end, you are famous, have many friends and most importantly you're happy.
You're happy that you decided to go on an adventure and in your elder years you are content with your legacy.`,
  ['/shop/alchemist', '/shop/smith']
);

export { endings };
