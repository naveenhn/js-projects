'use strict';

/**
 * @ngdoc function
 * @name navapp.controller:UsersRestController
 * @description
 * # UsersRestController
 * Controller of the users
 */



app
    .controller('UsersController', function ($scope, User) {

        //call auth call for validate.. 


        var user = '';
        var iat = '';

        $scope.usersObject = User.get();

        //console.log($scope.usersObject);
    });