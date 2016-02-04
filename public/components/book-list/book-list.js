angular.module( 'controllers' )
.controller( 'BookListCtrl', [ '$scope', '$http',
  function  ( $scope, $http ) {

    $http.get('/api/titles')
      .then( res => {
        $scope.books = res.data.filter( book => {
          return (book.availability.length > 0);
        });
      })
      .catch( err => {
        console.log(err[0]);
      });

  }
]);
