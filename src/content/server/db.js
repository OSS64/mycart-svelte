const productList = require('../resources/jsons/productlist.json');
const searchList = require('../resources/jsons/search.json');
const priceRange = require('../resources/jsons/pricerange.json');
const couponCode= require('../resources/jsons/couponcode.json');
module.exports = () => ({
    products: productList,
    search: searchList,
    coupon:couponCode,
    priceRg: priceRange
});