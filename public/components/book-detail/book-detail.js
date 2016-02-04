angular.module( 'controllers' )
.controller('BookDetailCtrl', [ '$scope', '$routeParams', '$http',
  function( $scope, $routeParams, $http ) {

    $http.get('/api/search?search=books&bookId=' + $routeParams.book_id)
      .then( res => {
        $scope.uniqueBook = res.data;
      });

    $http.get('/api/search/books/' + $routeParams.book_id)
      .then( res => {
        $scope.physicalBooks = res.data;
      });


  }
]);
