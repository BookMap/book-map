angular.module( 'controllers' ).controller('PublicProfileCtrl', ['$scope','$http', '$window',
  function ($scope, $http, $window) {
    var temp = JSON.parse($window.localStorage.temp);
    $scope.picture = 'https://graph.facebook.com/' + temp.id + '/picture?height=200&width=200';
    $scope.about = temp.about;
    $scope.user = temp.name;
    $http.get(`/api/books?owner=${temp.id}`)
         .then( function(res) {
            $scope.books = res.data;
         });
  }
]);
