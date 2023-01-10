const {
    db,
    models: { User, Product },
} = require("../server/db");
const _ = require("lodash");
const { faker } = require("@faker-js/faker");
const { times } = require("lodash");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log("db synced!");

    // const userFirstName =
    // const userLastName =
    // const userEmail =
    // const userStreetAddress =
    // const userCity = faker.address.cityName();
    // const userState = faker.address.state();
    // const userZip = faker.address.zipCode();
    // const userAddress = userStreetAddress.concat(
    //     " ",
    //     userCity,
    //     " ",
    //     userState,
    //     " ",
    //     userZip
    // );
    // const userPhoneNumber =
    // const userUsername =
    // const userPassword =

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
    // Creating Users
    // const users = await Promise.all([
    //   User.create({ username: 'cody', password: '123' }),
    //   User.create({ username: 'murphy', password: '123' }),
    // ])

    // console.log(`seeded ${users.length} users`)
    // console.log(`seeded successfully`)
    // return {
    //   users: {
    //     cody: users[0],
    //     murphy: users[1]
    //   }
    // }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
    console.log("seeding...");
    try {
        seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    }
    // finally {
    //     console.log("closing db connection");
    //     await db.close();
    //     console.log("db connection closed");
    // }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
    runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
