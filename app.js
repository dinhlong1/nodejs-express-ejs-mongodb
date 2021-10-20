let express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    flash      = require("connect-flash"),
    mongoose   = require("mongoose"),
    session    = require("express-session"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    MongoStore = require("connect-mongo")(session),
    Product    = require("./models/product"),
    User       = require("./models/user"),
    Cart       = require("./models/cart"),
    seedDB     = require("./product-seed");
   
const cart = require("./models/cart");
const { route } = require("./routes/user");
var userRoutes = require("./routes/user");

const db_url = "mongodb://127.0.0.1:27017/shopping"
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
seedDB();

//Passport and Session Config
app.use(session({
    secret: "This is secret bro!",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Takes user info and pass it to all templates rather than addind it to all tamplates one by one.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.session = req.session;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Routes
app.get("/", function(req, res){
    res.render("index"); 
 });



app.get("/shop", function(req, res,next){
    Product.find({}, function(err, products){
        if(err){
            console.log(err);
        }
        else{
            res.render("shop", {products: products});
        }
    });
});


// theem san pham
app.get("/add-to-cart/:id", function(req, res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId, function(err, product){
        if(err){
            return res.redirect("/");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/shop");
    });
});
//xoa sna pham
app.get("/remove/:id", function(req,res){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart :{});

    cart.removeItem(productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/cart');
})

//xoa gio hang
app.get("/removeAll", function(req,res){
    var cart = new Cart(req.session.cart ? req.session.cart :{});

    cart.removeAll();
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/shop');
})


app.get('/cart' , function(req, res, next){
    if (!req.session.cart) {
        return res.render('cart' , {products : null});
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', {products : cart.generateArray(), totalPrice : cart.totalPrice})
})

app.use("/user", userRoutes);

app.listen(3000, function(){
    console.log("Server Started!");
})