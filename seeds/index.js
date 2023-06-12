const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(`Connection error: ${err}`);
  });

const randomPick = function () {
  const randomCityNumber = Math.floor(Math.random() * cities.length);
  const location =
    cities[randomCityNumber].city + ", " + cities[randomCityNumber].state;

  const randomDesNumber = Math.floor(Math.random() * descriptors.length);
  const description = descriptors[randomDesNumber];

  const randomPlaceNumber = Math.floor(Math.random() * places.length);
  const title = description + " " + places[randomPlaceNumber];

  const price = Math.floor(Math.random() * 1000);

  const image = "https://source.unsplash.com/collection/483251";

  return { title, description, location, price, image };
};

const seedDB = async () => {
  await Campground.deleteMany();

  for (let i = 0; i < 50; i++) {
    const c = new Campground(randomPick());
    await c.save();

    console.log(c);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
