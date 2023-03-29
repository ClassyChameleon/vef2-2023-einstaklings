function Adventure(
  title,
  description,
  image,
  option1,
  option2,
  destination1,
  destination2,
  method1,
  method2,
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
  this.method1 = method1;
  this.method2 = method2;
  this.consequence1 = consequence1;
  this.consequence2 = consequence2;
}

const adventures = [];

// can recall adventures like:
// const adventureName = 'farm';
// adventures[adventureName];
adventures.farm = new Adventure();
