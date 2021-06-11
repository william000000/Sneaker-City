const productsData = require('../models/products.json');

class ProductController {
    static getProducts(req, res) {
        const { id } = req.query;
        const productResult = productsData.products;

        if (id === 'undefined') {
            return res.status(200).send(productResult);
        } else {
            const singleProduct = productResult.filter(prod => Number.parseInt(prod.id) === Number.parseInt(id));
            if (!singleProduct) {
                return res.status(404).send({ error: "The Product not found!" });
            }
            return res.status(200).send(singleProduct);

        }

    }
}

module.exports = ProductController;