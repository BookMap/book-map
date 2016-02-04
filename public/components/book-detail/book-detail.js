angular.module( 'controllers' )
.controller('BookDetailCtrl', [ '$scope', '$routeParams', '$http',
  function( $scope, $routeParams, $http ) {
    $scope.invalidId = false;
    $http.get('/api/books?unique_book=' + $routeParams.book_id)
      .then( res => {
        $scope.uniqueBook = res.data[0].unique_book;
        $scope.physicalBooks = res.data;
      })
      .catch( err => {
        $scope.invalidId = true;
      });

  }
]);
