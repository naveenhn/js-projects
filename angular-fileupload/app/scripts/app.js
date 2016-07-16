'use strict';

/**
 * @ngdoc overview
 * @name angularFileuploadApp
 * @description
 * # angularFileuploadApp
 *
 * Main module of the application.
 */


var app = angular
    .module('fileuploadApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/users', {
                templateUrl: 'views/users.html',
                controller: 'UsersController',
                controllerAs: 'users'
            })
            .when('/fileupload', {
                templateUrl: 'views/fileupload.html',
                controller: 'FileUploadController',
                controllerAs: 'fileupload'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            }).when('/products', {
                templateUrl: 'views/products.html',
                controller: 'ProductsController',
                controllerAs: 'productsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });