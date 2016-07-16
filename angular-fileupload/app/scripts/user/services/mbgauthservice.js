'use strict';

/**
 * @ngdoc function
 * @name Service
 * @description
 * # MBGAuthService
 * Controller of the users
 * @author Naveen
 */
var userService = app.service('MBGAuthservice', function ($http, $q, localStorageService) {

    this.authenticate = function (username, password) {
        var def = $q.defer();
        var url = 'https://localhost/v1/users/login';
        //var url = 'http://api-dev.mybuildguru.com/v1/users/login';

        var loginData = {
            'username': username,
            'password': password
        };

        var user = {};



        $http.post(url, loginData).then(
            function successCallback(response) {
                //on success
                console.log("success :" + response.data.message);
                if (response.data.user) {
                    //set user to localstorage
                    user = response.data.user;
                    console.log("user token", user.token);
                    localStorageService.set("mbg.user", user);
                    localStorageService.set("mbg.user.token", user.token);
                    def.resolve(user);

                }

            },
            function errorCallback(response) {
                //on error    

                console.log(response.data.message);
                def.reject("Unable to authenticate the user");



            });

        return def.promise;


    }

    this.logout = function () {
        return localStorageService.clearAll();
    }



});