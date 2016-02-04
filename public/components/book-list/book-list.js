angular.module( 'controllers' )
.controller( 'BookListCtrl', [ '$scope', '$http',
  function  ( $scope, $http ) {

    $http.get('/api/search?search=books')
      .then( res => $scope.books = res.data )
      .catch( err => console.log(err[0]) );

  }

]);
