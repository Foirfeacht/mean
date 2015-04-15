'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================


	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email, public_profile, user_photos, user_friends'] }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', { scope: ['email, public_profile, user_photos, user_friends'],
				successRedirect : '/#!/map',
				failureRedirect : '/'
			}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email, user_photos, user_friends' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/#!/map',
				failureRedirect : '/'
			}));

		// vk -------------------------------

		// send to vk to do the authentication
		app.get('/auth/vk', passport.authenticate('vkontakte', { scope : ['friends, photos, email'] }));

		// handle the callback after vk has authenticated the user
		app.get('/auth/vk/callback',
			passport.authenticate('vkontakte', { scope: ['friends, photos, email'],
				successRedirect : '/#!/map',
				failureRedirect : '/'
			}));

	// vk connect-------------------------------

		// send to vk to do the authentication
		app.get('/connect/vk', passport.authorize('vkontakte', { scope: ['friends, photos, email']}));

		// handle the vk after facebook has authorized the user
		app.get('/connect/vk/callback',
			passport.authorize('vkontakte', {
				successRedirect : '/#!/map',
				failureRedirect : '/'
			}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/#!/profile');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/#!/profile');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/vk', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.vk.token = undefined;
		user.save(function(err) {
			res.redirect('/#!/profile');
		});
	});

/**
 * Signup
 */


/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

/**
 * OAuth callback
 */
exports.oauthCallback = function(strategy) {
	return function(req, res, next) {
		passport.authenticate(strategy, function(err, user, redirectURL) {
			if (err || !user) {
				return res.redirect('/#!/signin');
			}
			req.login(user, function(err) {
				if (err) {
					return res.redirect('/#!/signin');
				}

				return res.redirect(redirectURL || '/');
			});
		})(req, res, next);
	};
};

