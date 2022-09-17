"use strict";

// import all required modules
const logger = require("../utils/logger");
const uuid = require("uuid");
const accounts = require("./accounts.js");

const wishlistStore = require("../models/wishlist-store.js");

// create dashboard object
const dashboard = {
  // index method - creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "Wishlist Dashboard",
        wishlists: wishlistStore.getUserWishlists(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      };
      logger.info("about to render" + viewData.wishlists);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },

  deleteWishlist(request, response) {
    const wishlistId = request.params.id;
    logger.debug("Deleting Wishlist" + wishlistId);
    wishlistStore.removeWishlist(wishlistId);
    response.redirect("/dashboard");
  },

  addWishlist(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newWishList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      games: [],
    };
    logger.debug("Creating a new Wishlist" + newWishList);
    wishlistStore.addWishlist(newWishList, function () {
      response.redirect("/dashboard");
    });
  },
};

// export the dashboard module
module.exports = dashboard;
