angular.module( 'controllers' )
.controller( 'BookListCtrl', [ '$scope', '$http',
  function  ( $scope, $http ) {

    $http.get('/api/titles')
      .then( function (res) {
        $scope.books = res.data.filter( function(book) {
          return (book.availability.length > 0);
        });
      });

  }
]);
