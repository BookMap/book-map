angular.module('controllers')

    .controller( 'HomeCtrl', [ '$scope', '$http', '$window',
        function( $scope, $http, $window ) {

            console.log("controller called");

            $scope.fblogout = function(){
                $window.localStorage.token='';
                $window.location.assign( '/#/home' );
                console.log ("logging out of facebook");
            };

            $http.get( '/api/users' ).then( function( res ) {
                    $scope.usersCount = res.data.length;
            });

            $http.get('/api/titles')
                .then( function (res)  {
                $scope.titlesCount = res.data.length;
            });

            $http.get('/api/books')
                .then( function (res) {
                $scope.bookCount = res.data.length;
                var tempborrow = res.data.filter(  (book) => {
                        return book.borrower;
                    });
                console.log (tempborrow.length, ' is borrowed ct');
                $scope.borrowCount = tempborrow.length;
            });

        }
    ]);
