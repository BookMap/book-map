angular.module( 'controllers' )
.controller('BookDetailCtrl', [ '$scope', '$routeParams', '$http',
  function( $scope, $routeParams, $http ) {
    $scope.invalidId = false;
    $scope.invalidBorrow = false;
    $http.get('/api/books?unique_book=' + $routeParams.book_id)
      .then( res => {
        $scope.uniqueBook = res.data[0].unique_book;
        $scope.physicalBooks = res.data;
      })
      .catch( err => {
        $scope.invalidId = true;
      });
    $scope.borrow = function (book) {
      $http({
        method: 'PATCH',
        url: '/api/profile/books/' + book._id + '?request=borrow'
      })
        .then( res => {
          book.borrower = true;
        })
        .catch( err => {
          book.invalidBorrow = true;
        });
    }

  }
]);
