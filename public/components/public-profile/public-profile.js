angular.module( 'controllers' ).controller('PublicProfileCtrl', ['$scope','$http', '$window',
  function ($scope, $http, $window) {
    var temp = JSON.parse($window.localStorage.temp);
    $scope.picture = 'https://graph.facebook.com/' + temp.id + '/picture?height=200&width=200';
    $http.get(`/api/search?search=books&userId=${temp.id}`)
         .then( function(res) {
            $scope.books = res.data;
            $scope.user = temp.name;
         });
  }
]);
