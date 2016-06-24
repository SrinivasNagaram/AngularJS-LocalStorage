"use script";

		var app = angular.module('localStorage', ['LocalStorageModule']);

		app.controller('storageCtrl', ['$scope', 'localStorageService', function ($scope, localStorageService) {  

		$scope.defaults = {
			navbar: {
				theme: 'primary',
				themes: ['primary', 'success', 'warning', 'danger', 'pink', 'purple', 'inverse', 'dark']
			}
		};

		$scope.settings = $scope.defaults; 
		$scope.storage = localStorageService;
		$scope.appSettings = "AppSettings"; 

		if($scope.defaults.navbar.theme) {
			$scope.defaultColor = "";
			$scope.settings = $scope.storage.get($scope.appSettings) || $scope.defaults;
			$scope.applyColor = $scope.settings.navbar.theme;   
		} 

		$scope.colorName = $scope.settings.navbar.theme;

		if($scope.appSettings !== null) {
			$scope.storage.set($scope.appSettings, $scope.settings); 
		}; 

		$scope.saveSettings = function(theme) { 
			$scope.settings.navbar.theme = theme;
			$scope.storage.set($scope.appSettings, $scope.settings);
		}; 

		$scope.colorChange = function(colorName) {
			var themes = $scope.settings.navbar.themes; 
			themes.filter(function(theme){
				if(colorName === theme) {
					$scope.applyColor = theme; 
					$scope.saveSettings(theme);
				}
			})  
		};

		$scope.resetTheme = function() { 
			$scope.storage.remove($scope.appSettings);
			$scope.settings = $scope.defaults; 
			location.reload();
		}   

}]); 
