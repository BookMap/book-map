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
                                + $rootScope.Id + '/picture?height=100&width=100';

                        })
                        .catch(function(err){console.log(err,': Could not get small                                 picture.'); })
                    }

                    $scope.fblogout = function () {
                        $window.localStorage.token = '';
                        $window.location.assign('/');
                    };

                    $scope.login = function(){


                    }

                    //$scope.getuser = function (username) {
                    //
                    //    $http.get('/api/users')
                    //        .then(function (res) {
                    //            $scope.users = res.data;
                    //        } );
                    //
                    //    $scope.getUser = function (username) {
                    //        $window.localStorage.temp = JSON.stringify({
                    //            id: user._id,
                    //            name: user.username,
                    //            about: user.about
                    //        });
                    //    }
                    //}
                }]
        }
    });
