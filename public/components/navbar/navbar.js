angular.module('controllers')  //components

    .directive('navbar', function(){
        return {
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html',

            controller: [ '$scope', '$http', '$window',
                function( $scope, $http, $window ) {

                     if ($window.localStorage.token) {
                        $http.get('/api/profile/')
                            .then(  function (res) {
                            $scope.username = res.data.username;
                        $scope.id = res.data.id;
                        //$scope.about = res.data.about;
                        $scope.picture = 'https://graph.facebook.com/'
                            + $scope.id + '/picture?height=30&width=30';
                        })
                        .catch(function(err){console.log(err,': Could not get small picture.');                              })

                    }

                    $scope.fblogout = function () {
                        $window.localStorage.token = '';
                        $scope.username="";
                        $scope.id='';


                        $window.location.assign('/#');
                        console.log("logging out of facebook");
                    };


                    $scope.getuser = function (username) {

                        $http.get('/api/users')
                            .then(function (res) {
                                $scope.users = res.data;
                            } );

                        $scope.getUser = function (user) {
                            $window.localStorage.temp = JSON.stringify({
                                id: user._id,
                                name: user.username,
                                about: user.about
                            });

                        }
                    }




                }]
        }
    });
