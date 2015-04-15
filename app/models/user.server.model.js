'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var userSchema = mongoose.Schema({

    facebook: {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        image		 : String
    },

    vkontakte: {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        image		 : String
    },

    firstName: {type: String, trim: true},
    lastName: {type: String, trim: true},

    name:  String,
    image: String,
    email: String,

    roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
});


//mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', userSchema);