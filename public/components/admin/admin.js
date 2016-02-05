angular.module( 'controllers' )
.controller('AdminCtrl', [ '$scope', '$http',
  function( $scope, $http ) {

    $http.get('/api/titles')
          .then( function (res) {
            $scope.titles = res.data;
          })
          .catch( function (err) {
            $scope.titleError = true;
          });

  }
]);
