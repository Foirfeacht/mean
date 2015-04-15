'use strict';

module.exports = {
	db: 'mongodb://localhost/findmates-test',
	port: 3001,
	app: {
		title: 'findmates - Test Environment'
	},
	facebook: {
		clientID: '1556663711272087',
		clientSecret: '6b16723e16c35fa758f97baa92dcb720',
		callbackURL: 'http://localhost:8080/auth/facebook/callback'
	},
	vkontakte : {
		clientID		: '4862983', // your App ID
		clientSecret 	: 'ToCVIhFVKa96FLPgLyJm', // your App Secret
		callbackURL 	: 'https://findmates-demo.herokuapp.com/auth/vk/callback'
	},
	/*
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}*/
};
