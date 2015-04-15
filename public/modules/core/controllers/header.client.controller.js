'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', '$mdSidenav',
	function($scope, Authentication, $mdSidenav) {
		$scope.authentication = Authentication;

		$scope.toggleNav = function() {
	       $mdSidenav('nav').toggle();
	    };
		
	}
]);