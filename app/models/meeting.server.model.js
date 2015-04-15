'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Meeting Schema
 */
var meetingsSchema = new Schema({
    title: {type: String, required: 'Заголовок не может быть пустым'},
    description: {type: String, default: ''},
    category: {type: String, default: 'Развлечения'},
    startDate: Date,
    startTime: Date,
    _owner: { type: Schema.Types.ObjectId, ref: 'User' },
	ownerFacebook: {type: String, ref: 'User'},
	ownerVK: {type: String, ref: 'User'},
    ownerName: { type: String, ref: 'User' },
    invitedUsers: {type: Array, default: []},
    participants: {type: Array, default: []},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: null },
    longitude: String,
    latitude: String,
    position: String,
    location: String,
    marker: Schema.Types.Mixed,
    visibility: {type: String, default: 'Все'}
});

//mongoose.model('Article', ArticleSchema);




module.exports = mongoose.model('Meeting', meetingsSchema);