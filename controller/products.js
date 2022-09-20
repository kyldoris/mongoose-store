//I had help from our study group//

//DEPENDENCIES
require("dotenv").config();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const db = mongoose.connection;
const express = require('express');
const productsRouter = express.Router(); 
const Store = require ('../models/products')
const products = require('../models/items')


// NEW
productsRouter.get("/new", (req, res) => {
  Store.create(req.body, async () => {
    res.render('new.ejs')
  })
});

// DELETE
productsRouter.delete('/:id', (req,res)=>{
  Store.findByIdAndDelete(req.params.id, (error, foundItem) =>{
    productId = req.params.id;
    res.redirect('./')
  })
})

// UPDATE
productsRouter.put('/:id', (req, res) => {
  const newItem = {
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,
      price: req.body.price,
      qty: req.body.qty,
  }
  products.findByIdAndUpdate(req.params.id, newItem, (error, foundItem) => {
      foundItem[req.params.id] = newItem;
      res.redirect(`/${req.params.id}`)
  })
});

// CREATE
productsRouter.post("/", (req, res) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    price: req.body.price,
    qty: req.body.qty
  }

  Store.create(newProduct, (error, foundItem) => {
        res.redirect('/');
    });
})

// EDIT
productsRouter.get('/:id/edit', (req, res) => {
  Store.findById(req.params.id, (err, foundItem) => {
      res.render('edit.ejs', {
        product: products[req.params.id],
        productId: req.params.id
      })
  })
});

// SHOW
productsRouter.get('/:id', (req, res) => {
  Store.findById(req.params.id, (err, foundItem) => {
    res.render("show.ejs", {
      product: products[req.params.id],
      productId: req.params.id

      
    });
  });
});

//exports
module.exports = productsRouter;