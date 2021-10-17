var mongoose = require("mongoose");
var Product = require("./models/product");

var products = [
    {
        image: "img/products/women-1.jpg",
        title: "Pure Pineapple",
        offer: "2300",
        price: 1700
    },
    {
        image: "img/products/women-2.jpg",
        title: "Pure Pineapple",
        offer: "900",
        price: 500
    },
    {
        image: "img/products/women-3.jpg",
        title: "Pure Pineapple",
        offer: "200",
        price: 120
    },
    {
        image: "img/products/women-4.jpg",
        title: "Pure Pineapple",
        offer: "1990",
        price: 1220
    },
    {
        image: "img/products/man-1.jpg",
        title: "Pure Pineapple",
        offer:  "1300",
        price: 800
    },
    {
        image: "img/products/man-2.jpg",
        title: "Nike Strike",
        offer: "1200",
        price: 520
    },
    {
        image: "img/products/man-3.jpg",
        title: "Pure Pineapple",
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
    // MyPost.remove({}, err => {
    //     if(err) console.log(err);
    //     blogs.forEach(seed => {
    //         MyPost.create(seed, (err, blog) => {
    //             if(err) console.log(err);
    //             blog.save();
    //         });
    //     });
    // });
}


module.exports = seedDB;