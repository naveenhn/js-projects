'use strict';

/**
 * @ngdoc function
 * @name navapp.controller:UsersRestController
 * @description
 * # UsersRestController
 * Controller of the users
 */



app
    .controller('ProductsController', function ($scope, Products) {



        $scope.productsData = Products.get({
            'subCategory': 'Pipes & Fittings'
        });


        // $scope.getSomeCategory = Products.get({});

        //console.log($scope.usersObject);
    });