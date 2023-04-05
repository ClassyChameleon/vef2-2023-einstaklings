function Ending(title, image, description) {
  this.title = title;
  this.image = image;
  this.description = description;
}

const endings = [];

endings.home = new Ending(
  'Early Retirement',
  'https://assets.seniority.in/media/wysiwyg/shutterstock_1230212695.jpg',
  `Instead of doing something exciting with your life, you instead choose to stay at home.
  Years pass and as you grow old you begin to regret not creating any memories for you to look back on.`
);

endings.bridge = new Ending(
  'Drowned in greed',
  'https://i.redd.it/oq84qzfr2nk91.jpg',
  `Halfway across the river you become exhausted and sink like a rock.
  With your final breath, you smile with pride for having 50 gold coins in your pocket rather than 40.`
);

endings.town = new Ending(
  'An honest attempt',
  'https://images.pexels.com/photos/5341407/pexels-photo-5341407.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  `With no hope of getting past the dragon, you head back home.
  You feel happy knowing that at least you tried to do something special.
  If another adventure comes up, you feel confident that you wont shy away from it.`
);

endings.dragon = new Ending(
  'Slain by a dragon',
  'https://thumbs.dreamstime.com/b/chewing-cartoon-dragon-full-mouth-vector-illustration-147607400.jpg',
  `With your blunt dagger, you sneak up on the sleeping dragon.
  You poke it with the pointy end, but the blade breaks on impact.
  The dragon wakes up and eats you.`
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
In the end, you are happy that you decided to go on an adventure and in your elder years you are content with your legacy.`
);

endings.kingsCrown = new Ending(
  'Invisibility potion',
  'https://res.cloudinary.com/ddhokwpkf/image/upload/v1680609640/KingsCrown_c0l4tv.png',
  `You leave the village disappointed.
  As you're about to give up and head home, a familiar crow lands in front of you holding the invisibility potion from the alchemist.
  You hold your hand out and the crow drops the potion in your hand and flies away. They sure are smart creatures

  You head off to Mount Ashmoor as you are sure this potion will help you get some treasure.
  As you approach the dragon, you gulp down your invisibility potion.
  It really works, you are invisible!
  Your clothes are also invisible. Seems that everything you touch also becomes invisible.
  As you sneak by the slumbering dragon, it wakes up.
  You stand still and hear your heartbeat pulsing quickly.
  The dragon sees nothing wrong and goes back to sleep.
  You sneak by and enter the treasure room

It's an enormous cave, mostly comprised of gold coins with some gems and pearls scattered about.
In the center stands a crown, embedded with more gems than you can count.
This must be the king's crown!
You put it on and it turns invisible.

You leave with the King's crown the same way you came in and return it to the king.
The king is pleased and grants you a life of luxury and holds a feast in your honor.
In the end, you are happy that you decided to go on an adventure and in your elder years you are content with your legacy.`
);

export { endings };
