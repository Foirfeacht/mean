'use strict';

module.exports = {
	port: 443,
	db: 'mongodb://admin:vitmal1991@ds033897.mongolab.com:33897/heroku_app34769764',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.min.js',
				'public/lib/angular-animate/angular-animate.min.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: '1556663711272087',
		clientSecret: '6b16723e16c35fa758f97baa92dcb720',
		callbackURL: 'https://findmates-demo.herokuapp.com/auth/facebook/callback'
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