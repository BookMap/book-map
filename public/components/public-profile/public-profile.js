angular.module( 'controllers' ).controller('PublicProfileCtrl', ['$rootScope','$scope','$http', '$window',
  function ($rootScope, $scope, $http, $window) {

      var loggedInId = $rootScope.Id;

      $http.get(`/api/books?owner=${loggedInId}`)
         .then( function(res) {
            $scope.books = res.data;
         });
  }
]);


