angular.module('controllers')

    .controller( 'HomeCtrl', [ '$rootScope','$scope', '$http', '$window',
        function( $rootScope, $scope, $http, $window ) {

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
                var tempborrow = res.data.filter(  function(book) {
                        return book.borrower;
                    });
                $scope.borrowCount = tempborrow.length;
            });



        }
    ]);
