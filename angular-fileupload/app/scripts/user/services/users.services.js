//var users_api = "http://localhost:8080/mbg-api-gateway/v1/users";
'use strict';

var userService = app.factory('User', function ($resource, appconfig) {

    //var serviceURL = "http://api-dev.mybuildguru.com/v1/users";
    //var serviceURL = "http://localhost:8080/mbg-api-gateway/v1/users";
    var serviceURL = appconfig.MBG_API_URL + '/users';

    return $resource(serviceURL, {}, {});

});