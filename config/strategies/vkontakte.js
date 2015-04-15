'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	url = require('url'),
	VKontakteStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	User = require('../../app/controllers/users.server.controller');

module.exports = function() {
	// Use facebook strategy
	passport.use(new VKontakteStrategy({
			clientID          : configAuth.vkontakteAuth.clientID,
	        clientSecret      : configAuth.vkontakteAuth.clientSecret,
	        callbackURL       : configAuth.vkontakteAuth.callbackURL,
	        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
		},
		function(req, accessToken, refreshToken, params, profile, done) {
			// Set the provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// asynchronous
	        process.nextTick(function() {

	            // check if the user is already logged in
	            if (!req.user) {

	                User.findOne({ 'vkontakte.id' : profile.id }, function(err, user) {
	                    if (err)
	                        return done(err);

	                    if (user) {

	                        // if there is a user id already but no token (user was linked at one point and then removed)
	                        if (!user.token) {
	                            user.vkontakte.token = token;
	                            user.vkontakte.name  = profile.displayName;
	                            user.vkontakte.email = params.email.toLowerCase();
	                            user.vkontakte.image = profile.photo_200; 

	                            user.save(function(err) {
	                                if (err)
	                                    return done(err);
	                                    
	                                return done(null, user);
	                            });
	                        }

	                        return done(null, user); // user found, return that user
	                    } else {
	                        // if there is no user, create them
	                        var newUser            = new User();

	                        newUser.vkontakte.id    = profile.id;
	                        newUser.vkontakte.token = token;
	                        newUser.vkontakte.name  = profile.displayName;
	                        newUser.vkontakte.email = params.email.toLowerCase();
	                        newUser.email           = params.email.toLowerCase();
	                        newUser.name            = profile.displayName;
	                        newUser.vkontakte.image = profile.photo_200; 
	                        newUser.image           = profile.photo_200;
	    
	                        newUser.save(function(err) {
	                            if (err)
	                                return done(err);
	                                
	                            return done(null, newUser);
	                        });
	                    }
	                });

	            } else {
	                // user already exists and is logged in, we have to link accounts
	                var user            = req.user; // pull the user out of the session

	                user.vkontakte.id    = profile.id;
	                user.vkontakte.token = token;
	                user.vkontakte.name  = profile.displayName;
	                user.vkontakte.email = params.email.toLowerCase();
	                user.vkontakte.image = profile.photo_200;  


	                user.save(function(err) {
	                    if (err)
	                        return done(err);
	                        
	                    return done(null, user);
	                });

	            }
	        });
		}
	));
};