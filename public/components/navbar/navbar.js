angular.module('controllers')  //components

    .directive('navbar', function(){
        return {
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html',

            controller: [ '$rootScope', '$scope', '$http', '$window',
                function( $rootScope, $scope, $http, $window ) {
                     if ($window.localStorage.token) {
                        $http.get('/api/profile/')
                             .then(  function (res) {

                            $rootScope.User = res.data.username;
                            $rootScope.Id  = res.data.id;
                            $rootScope.About = res.data.about;
                            $rootScope.Picture = 'https://graph.facebook.com/'
                                + $rootScope.Id + '/picture?height=30&width=30';
                            $rootScope.PictureBig = 'https://graph.facebook.com/'
                                + $rootScope.Id + '/picture?height=150&width=150';

                        })
                        .catch(function(err){console.log(err,': Could not get                                 picture or other info.'); })
                    }

                    $scope.fblogout = function () {
                        $window.localStorage.token = '';
                        $window.location.assign('/');
                    };



                }]
        }
    });
