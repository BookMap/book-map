angular.module('controllers')  //components

    .directive('navbar', function(){
        return {
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html',

            controller: [ '$scope', '$http', '$window',
                function( $scope, $http, $window ) {

                    console.log('happening thing');

                    //if ( !$window.localStorage.token ) {
                    //      $window.location.assign( '/#' );
                    //}

                    $scope.fblogout = function () {
                        $window.localStorage.token = '';
                        $window.location.assign('/#/home');
                        console.log("logging out of facebook");
                    };

                }
            ]}

    });




