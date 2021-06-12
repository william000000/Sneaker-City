const sortData = require('../helpers/sortData');
const productsData = require('../models/products.json');

/**
 * @exports
 * @class ProductController
 */
class ProductController {
    /**
      * This method retrieve all products details and specific product if id is specified
     * @static
     * @description GET  /api/products  OR /api/products?id=7 
     * @param {Object} req request object
     * @param {Object} res response object
     * @returns {Object} response
     */
    static getProducts(req, res) {
        const { id } = req.query;
        const productResult = productsData.products;

        if (id === undefined) {
            return res.status(200).send(productResult);
        } else {
            const singleProduct = productResult.filter(prod => Number.parseInt(prod.id) === Number.parseInt(id));
            if (!singleProduct) {
                return res.status(404).send({ error: "The Product not found!" });
            }
            return res.status(200).send(singleProduct);
        }
    }

    /**
    * This method implement sort by both ascending order and descending
   * @static
   * @description GET /api/products/sort?order=asc
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Object} response
   */
    static sortProductsByDate(req, res) {
        const productResult = productsData.products;
        const { orderBy } = req.query;

        const sortedData = sortData(productResult, orderBy);

        return res.status(200).send(sortedData);
    }
}

module.exports = ProductController;