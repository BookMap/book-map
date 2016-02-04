angular.module('controllers')

    .controller( 'HomeCtrl', [ '$scope', '$http', '$window',
        function( $scope, $http, $window ) {

            console.log('happening thing');

            //if ( !$window.localStorage.token ) {
            //      $window.location.assign( '/#' );
            //}

            $scope.fblogout = function(){
                $window.localStorage.token='';
                $window.location.assign( '/#/home' );
                console.log ("logging out of facebook");
            };




        }
    ]);
