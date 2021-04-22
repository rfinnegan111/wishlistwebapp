'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const wishlistStore = require('../models/wishlist-store');
const accounts = require ('./accounts.js');

const wishlist = {
  index(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);  
      const wishlistId = request.params.id;
      logger.debug('Wishlist id = ' + wishlistId);
      if (loggedInUser) {
      const viewData = {
        title: 'Wishlist',
        wishlist: wishlistStore.getWishlist(wishlistId),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render('wishlist', viewData);
      }
      else response.redirect('/');
  },
    deleteGame(request, response) {
    const wishlistId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug('Deleting Game' + gameId + 'from Wishlist' + wishlistId);
    wishlistStore.removeGame(wishlistId, gameId);
    response.redirect('/wishlist/' + wishlistId);
  },
    addGame(request, response) {
    const wishlistId = request.params.id;
    const wishlist = wishlistStore.getWishlist(wishlistId);
    const newGame = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    wishlistStore.addGame(wishlistId, newGame);
    response.redirect('/wishlist/' + wishlistId);
  },  
  updateGame(request, response) {
    const wishlistId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug("updating game " + gameId);
    const updatedGame = {
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    wishlistStore.editGame(wishlistId, gameId, updatedGame);
    response.redirect('/wishlist/' + wishlistId);
  }
};

module.exports = wishlist;