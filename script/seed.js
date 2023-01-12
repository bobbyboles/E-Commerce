const {
    db,
    models: { User, Product, Cart },
} = require("../server/db");
const _ = require("lodash");
const { faker } = require("@faker-js/faker");
const { times } = require("lodash");

async function seed() {
    await db.sync({ force: true }); 
    console.log("db synced!");

    try {
        times(
            100,
            async () =>
                await User.create({
                    username: faker.internet.userName(),
                    password:'password' ,
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    email: faker.internet.email(),
                    address: faker.address.streetAddress().concat( ' ', faker.address.cityName(), ' ', faker.address.state(), ' ', faker.address.zipCode() ),
                    phone: faker.phone.number(),
                }),
        );
    } catch (err) {
        console.log(err);
    }
    try{
        times(100, async ()=> await Product.create({
                productName: faker.commerce.productName(),
                category: faker.helpers.arrayElement(['xbox', 'ps', 'ps2', 'nes', 'snes', 'n64', 'wii', 'ps3']),
                stockQuantity: Math.floor(Math.random()*100),
                description: faker.commerce.productDescription(),
                price: Math.floor(Math.random()*100)
            }))
    }catch(err){
        console.log(err)
    }
}

async function runSeed() {
    console.log("seeding...");
    try {
        seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    }
}

if (module === require.main) {
    runSeed();
}

module.exports = seed;
