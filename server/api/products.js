const router = require("express").Router();
const {
    models: { Product },
} = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll({});
        res.json(products);
    } catch (err) {
        next(err);
    }
});

router.get("/:productId", async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        //console.log(product)
        res.send(product);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const products = await Product.create(req.body);
        res.send(products);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const products = await Product.findByPk(req.params.id);
        res.send(await products.update(req.body));
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        product.destroy();
        res.send(product);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
