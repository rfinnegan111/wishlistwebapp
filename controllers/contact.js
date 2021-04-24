'use strict';

// import all required modules
const logger = require('../utils/logger');
const developerStore = require('../models/developer-store.js');
const accounts = require ('./accounts.js');

// create contact object
const contact = {
  
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request); 
    logger.info('contact rendering');
    if (loggedInUser) {
      const viewData = {
        title: 'About the Wishlist App',
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render('contact', viewData);
    }
    else response.redirect('/');    
  },
  
};

// export the contact module
module.exports = contact;