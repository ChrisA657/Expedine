const knex = require('../db/knex');


const PRODUCT_TABLE = 'product';

const createNewProduct = async (product_id, product_name, product_price, product_stock, product_description, farmer_id, farm_name) => {
    const query = knex(PRODUCT_TABLE).insert({product_id, product_name, product_price, product_stock, product_description, farmer_id, farm_name});
    return query;
}

module.exports = {
    createNewProduct
};