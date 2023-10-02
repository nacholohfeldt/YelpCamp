const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedsHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "650b19aaeff18b9ec0de81cf",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                "type": "Point",
                "coordinates": [cities[random1000].longitude,
                cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbnzdgn7i/image/upload/v1695667245/YelpCamp/ruimj7x4mqtgaohmbsha.jpg',
                    filename: 'YelpCamp/ruimj7x4mqtgaohmbsha',
                },
            ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae labore quam accusantium, corrupti hic assumenda. Neque hic voluptatem minus rem perferendis temporibus qui eveniet nam? Voluptates totam sunt quis exercitationem.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})