angular.module('controllers')  //components

    .directive('navbar', function(){
        return {
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html',

            controller: [ '$scope', '$http', '$window',
                function( $scope, $http, $window ) {

                    //if ( !$window.localStorage.token ) {
                    //      $window.location.assign( '/#' );
                    //}

                    $http.get('/api/profile/')
                        .then( res => {
                        $scope.username = res.data.username;
                        $scope.id = res.data.id;
                        //$scope.about = res.data.about;
                        $scope.picture = 'https://graph.facebook.com/'
                            + $scope.id + '/picture?height=30&width=30';
                    })

                    $scope.fblogout = function () {
                        $window.localStorage.token = '';
                        $scope.username="";
                        $scope.id='';
                        $scope.picture='';

                        $window.location.assign('/#');
                        console.log("logging out of facebook");
                    };

                }]
        }
    });


