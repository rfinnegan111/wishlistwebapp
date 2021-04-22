'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const wishlist = require('./controllers/wishlist.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/wishlist/:id', wishlist.index);

router.get('/wishlist/:id/deleteSong/:songid', wishlist.deleteSong);
router.post('/wishlist/:id/addsong', wishlist.addSong);

router.get('/dashboard/deletewishlist/:id', dashboard.deleteWishlist);
router.post('/dashboard/addwishlist', dashboard.addWishlist);

router.post('/wishlist/:id/updatesong/:songid', wishlist.updateSong);

// export router module
module.exports = router;

