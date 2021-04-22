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
    deleteSong(request, response) {
    const wishlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug('Deleting Song' + songId + 'from Wishlist' + wishlistId);
    wishlistStore.removeSong(wishlistId, songId);
    response.redirect('/wishlist/' + wishlistId);
  },
    addSong(request, response) {
    const wishlistId = request.params.id;
    const wishlist = wishlistStore.getWishlist(wishlistId);
    const newSong = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    wishlistStore.addSong(wishlistId, newSong);
    response.redirect('/wishlist/' + wishlistId);
  },  
  updateSong(request, response) {
    const wishlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug("updating song " + songId);
    const updatedSong = {
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    wishlistStore.editSong(wishlistId, songId, updatedSong);
    response.redirect('/wishlist/' + wishlistId);
  }
};

module.exports = wishlist;