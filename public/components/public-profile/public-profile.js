angular.module( 'controllers' ).controller('PublicProfileCtrl', ['$scope','$http', '$window',
  function ($scope, $http, $window) {
    console.log($window.localtion);
  }
]);
