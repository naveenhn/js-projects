app.directive('dropzone', function(){
    
    return {
                    restrict: 'C',
                    link: function(scope, element, attrs) {

                        var config = {
                           //url: 'http://localhost:8080/upload',
                            url: scope.uploadFileUrl,
                            maxFilesize: 100,
                            paramName: "file",
                            maxThumbnailFilesize: 10,
                            parallelUploads: 10,
                            uploadMultiple:true,
                            autoProcessQueue: false
                         
                        };

                        var eventHandlers = {
                            'sending' : function (file, xhr, formData) {
                              formData.append("filesize", file.size);
                            },
                            'addedfile': function(file) {
                                scope.file = file;
                                
                                /*if (this.files[1]!=null) {
                                    this.removeFile(this.files[0]);
                                }*/
                                scope.$apply(function() {
                                    scope.fileAdded = true;
                                });
                            },

                            'success': function (file, response) {
                                //do nothing
                            }

                        };

                        dropzone = new Dropzone(element[0], config);

                        angular.forEach(eventHandlers, function(handler, event) {
                            dropzone.on(event, handler);
                        });

                        scope.processDropzone = function() {
                            dropzone.processQueue();
                        };

                        scope.resetDropzone = function() {
                            dropzone.removeAllFiles();
                        }
                    }
                }
    
    
});