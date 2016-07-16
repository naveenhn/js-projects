'use strict';
/**
 * @ngdoc function
 * @name interceptor : MBGAUthInterceptor
 * @description
 * # UsersRestController
 * Controller of the users
 * @author Naveen
 */

app.factory('MBGAuthInterceptor', ['$log', '$q', 'localStorageService', function ($log, $q, localStorageService) {


    //main interceptor code
    var httpInterceptor = {

        request: function (config) {
            $log.debug(config);

            //check if user is already logged in, then only go for adding token headers also check if request for localhost or mbg domains
            if (localStorageService.get('mbg.user.token') && localStorageService.get('mbg.user') && isMBGApiReq(config)) {


                //now do the process of adding additional headers, remember adding these additional headers will trigger auth process on api
                $log.debug('constructing auth token and adding headers');
                var user = localStorageService.get('mbg.user');
                var uid = user.uid;
                var usertoken = user.token;
                var date = getRequestDateAsISO();
                var nonce = getNonce();
                var authToken = getAuthToken(uid, usertoken, date, nonce);

                if (authToken) {
                    //set the headers now
                    config.headers['X-Auth-Token'] = authToken;
                    config.headers['X-Auth-Date'] = date;
                    config.headers['nonce'] = nonce;
                }

            }


            return config;
        }


    };


    return httpInterceptor;



    //private methods go here

    /**
     * Method to check if token needs to be added 
     * @param   {object}  config [[HTTP config ]]
     * @returns {boolean} [[True if it matches localhost/mybuildguru.com domains]]
     */
    function isMBGApiReq(config) {
        if (config) {
            var url = config.url;
            if (url.indexOf('localhost') > -1 || url.indexOf('mybuildguru.com') > -1) {
                $log.debug('config url contains localhost/mbg domain');
                return true;
            }
        }

        return false;
    }

    /**
     * [[Get auth token]]
     * @param {[[Type]]} userid    [[Description]]
     * @param {[[Type]]} userToken [[Description]]
     * @param {[[Type]]} date      [[Description]]
     * @param {[[Type]]} nonce     [[Description]]
     */
    function getAuthToken(userid, userToken, date, nonce) {
        $log.debug('Getting hashed auth token for : ' + userid + '-' + userToken + '-' + date + '-' + nonce);
        var tokenToHash = userToken + ':' + date + '-' + nonce; // format of auth token to send
        var hashObj = new jsSHA("SHA-256", "TEXT");
        hashObj.update(tokenToHash);
        var hash = hashObj.getHash("HEX");

        $log.debug('Generated hash is : ' +
            userid + ':' + hash);
        return userid + ':' + btoa(hash); // btoa(string)





    }

    /**
     * [[It will get the request Date in ISO format]]
     */
    function getRequestDateAsISO() {
        var d = new Date();
        return d.toISOString();


    }


    /**
     * [[Get random number - 4 digit]]
     */
    function getNonce() {

        return Math.floor(1000 + Math.random() * 9000);

    }



}]);

//push the interceptor to httpprovider

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('MBGAuthInterceptor');
}]);