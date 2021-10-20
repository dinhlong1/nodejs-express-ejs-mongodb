var mongoose = require("mongoose");
var Product = require("./models/product");

var products = [
    {
        image: "https://product.hstatic.net/1000284478/product/50w_31ts03031_1_699b65ae2b084377a5ff525208035dcf_master.jpg",
        title: "Short Sleeve T-shirt",
        offer: "2300",
        price: 1700
    },
    {
        image: "https://product.hstatic.net/1000284478/product/04_519369_1_51901930565d439482d7f2170a4c331e_master.jpg",
        title: "T-shirt Puma",
        offer: "900",
        price: 500
    },
    {
        image: "https://product.hstatic.net/1000284478/product/50l_31hds2011_1_5e84cc7aa566417f8a64b60cd1207b2e_master.jpg",
        title: "Hoddie NY Yankees",
        offer: "200",
        price: 1200
    },
    {
        image: "https://product.hstatic.net/1000284478/product/01_pm1-46600088_1_d280920083874da7af9aa09e8733a662_master.jpg",
        title: "Men's shoes",
        offer: "1990",
        price: 1220
    },
    {
        image: "https://product.hstatic.net/1000284478/product/01_ck2-80700998-4_1_27f2b0ae212746f988985eeee164cd28_large.jpg",
        title: "Crossbody Bag CHARLES & KEITH",
        offer: "1300",
        price: 800
    },
    {
        image: "https://product.hstatic.net/1000284478/product/50l_32cp07011_2_7af1e25fc2fc4269b1f0f24c060382c0_large.jpg",
        title: "Baseball Cap MLB",
        offer: "1200",
        price: 520
    },
    {
        image: "https://product.hstatic.net/1000284478/product/0076_4000030_1_5808698b5cff4ff099267d85e27c35d4_large.jpg",
        title: "Slim Women's Sandals",
        offer: "900",
        price: 625
    }
];


function seedDB(){
    Product.remove({}, err => {
        if(err) console.log(err);
        products.forEach(seed => {
            Product.create(seed, (err, product) => {
                if(err) console.log(err);
                product.save();
            });
        });
    });
}


module.exports = seedDB;