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

const wishListStore = {

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

  addSong(id, song) {
    const wishlist = this.getWishlist(id);
    wishlist.songs.push(song);
  },

  removeSong(id, songId) {
    const wishlist = this.getWishlist(id);
    const songs = wishlist.songs;
    _.remove(songs, { id: songId});
  },
  
  editSong(id, songId, updatedSong) {
    const wishlist = this.getWishlist(id);
    const songs = wishlist.songs;
    const index = songs.findIndex(song => song.id === songId);
    songs[index].title = updatedSong.title;
    songs[index].artist = updatedSong.artist;
    songs[index].genre = updatedSong.genre;
    songs[index].duration = updatedSong.duration;
  },
  
  getUserWishlists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = wishlistStore;