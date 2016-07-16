'use strict';

/**
 * @ngdoc function
 * @name fileuploadApp.controller:FileUploadCtrl
 * @description
 * # FileUploadCtrl
 * Controller of the FileuploadApp
 */

app
  .controller('FileUploadController',
                function ($scope) {

                    $scope.uploadFileUrl = 'http://localhost:8080/mbg-api-gateway/v1/file/upload';
                    $scope.filename = '';

                    $scope.uploadFile = function() {
                        $scope.processDropzone();
                    };

                    $scope.reset = function() {
                        $scope.resetDropzone();
                    };
                }

            );
            
          