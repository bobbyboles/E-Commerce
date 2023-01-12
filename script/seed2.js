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
