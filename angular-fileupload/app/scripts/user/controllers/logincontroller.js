'use strict';

/**
 * @ngdoc function
 * @name controller:UsersRestController
 * @description
 * # UsersRestController
 * Controller of the users
 * @author Naveen
 */



app
    .controller('LoginController', function ($scope, $location, MBGAuthservice) {



        //call auth call for validate.. 
        /**
         * [[Login]]
         * @param {object} user [[Description]]
         */
        $scope.login = function (user) {
            console.log(user.emailaddress);
            console.log(user.password);

            //get a promise and wait for it to complete
            MBGAuthservice.authenticate(user.emailaddress, user.password).then(function (data) {
                console.log(data.username)
                if (data.username)
                    $location.path("/users");

            }, function () {
                console.log("unable to login user");
            });


        }

        /**
         * [[Logout]]
         */
        $scope.logout = function () {

            console.log("Cleared the user info : " + MBGAuthservice.logout());


        }





        //$scope.usersObject = UserService.get();

        //console.log($scope.usersObject);
    });