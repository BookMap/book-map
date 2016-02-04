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


            $http.get( '/api/users' ).then( function( res ) {
                    $scope.usersCount = res.data.length;
            });

            $http.get('/api/titles')
                .then( res => {
                $scope.titlesCount = res.data.length;
            });

            $http.get('/api/books')
                .then( res => {
                $scope.bookCount = res.data.length;

                for(ii=0; ii<res.data.length; ii++){
                    console.log(res.data.borrower, "is borrowers");

                }
            });









        }
    ]);
