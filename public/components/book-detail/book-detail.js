angular.module( 'controllers' )
.controller('BookDetailCtrl', [ '$scope', '$routeParams', '$http',
  function( $scope, $routeParams, $http ) {
    $scope.invalidId = false;
    $scope.invalidBorrow = false;
    $http.get('/api/books?unique_book=' + $routeParams.book_id)
      .then( function(res) {
        $scope.uniqueBook = res.data[0].unique_book;
        $scope.physicalBooks = res.data;
      })
      .catch( function(err) {
        $scope.invalidId = true;
      });
    $scope.borrow = function (book) {
      $http({
        method: 'PATCH',
        url: '/api/profile/books/' + book._id + '?request=borrow'
      })
        .then( function(res) {
          book.borrower = true;
        })
        .catch( function(err) {
          book.invalidBorrow = true;
        });
    }

  }
]);
