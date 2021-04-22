'use strict';

// import all required modules
const logger = require('../utils/logger');
const wishlistStore = require('../models/wishlist-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    
    if(loggedInUser){
      
      const wishlists = wishlistStore.getAllWishlists();
      let numWishlists = wishlists.length;
      let numGames = 0;
      for (let i in wishlists) {
        numGames = numGames + wishlists[i].games.length;
      }

      const viewData = {
        title: 'Welcome to the Wishlist App!',
        totalWishlists: numWishlists,
        totalGames: numGames,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;