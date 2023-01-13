const {
    db,
    models: { User, Product, Cart },
} = require("../server/db");
const _ = require("lodash");
const { faker } = require("@faker-js/faker");
const { times } = require("lodash");

async function seed() {
    await db.sync(); 
    console.log("db synced!");

        await Cart.create({
            userId:1,
            productId:1,
            quantity:1,
            completed: false
        })
        
        await User.create({
            username: 'admin' , 
            password: "password",
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            address: faker.address
                .streetAddress()
                .concat(
                    " ",
                    faker.address.cityName(),
                    " ",
                    faker.address.state(),
                    " ",
                    faker.address.zipCode()
                ),
            phone: faker.phone.number(),
            isAdmin: true
        })
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
