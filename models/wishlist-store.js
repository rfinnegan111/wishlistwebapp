'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const wishlistStore = {

  store: new JsonStore('./models/wishlist-store.json', { wishlistCollection: [] }),
  collection: 'wishlistCollection',

  getAllWishlists() {
    return this.store.findAll(this.collection);
  },

  getWishlist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addWishlist(wishlist, response) {
    wishlist.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            wishlist.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, wishlist);
  },

  removeWishlist(id) {
    const wishlist = this.getWishlist(id);
    this.store.remove(this.collection, wishlist);
  },

  removeAllWishlists() {
    this.store.removeAll(this.collection);
  },

  addGame(id, game) {
    const wishlist = this.getWishlist(id);
    wishlist.games.push(game);
  },

  removeGame(id, gameId) {
    const wishlist = this.getWishlist(id);
    const games = wishlist.games;
    _.remove(games, { id: gameId});
  },
  
  editGame(id, gameId, updatedGame) {
    const wishlist = this.getWishlist(id);
    const games = wishlist.games;
    const index = games.findIndex(game => game.id === gameId);
    games[index].title = updatedGame.title;
    games[index].artist = updatedGame.artist;
    games[index].genre = updatedGame.genre;
    games[index].duration = updatedGame.duration;
  },
  
  getUserWishlists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = wishlistStore;