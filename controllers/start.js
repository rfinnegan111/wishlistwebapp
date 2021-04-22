'use strict';

// import all required modules
const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    
    if(loggedInUser){
      
      const playlists = playlistStore.getAllPlaylists();
      let numPlaylists = playlists.length;
      let numSongs = 0;
      for (let i in playlists) {
        numSongs = numSongs + playlists[i].songs.length;
      }

      const viewData = {
        title: 'Welcome to the Playlist App!',
        totalPlaylists: numPlaylists,
        totalSongs: numSongs,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;