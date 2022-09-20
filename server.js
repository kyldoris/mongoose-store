// I had help from study group
// DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const Store = require ("./models/products")
const products = require('./models/items.js');




//Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

const productsController = require('./controller/products.js');
app.use('/products', productsController)


// DATABASE CONFIGURATION
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ROUTES
app.get('/', (req, res) => {
    Store.find({}, (error, allProduscts) => {
      res.render('index.ejs', {
        allProducts: products
      });
    });
  });


// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The serer is listening on port: ${PORT}`)
})