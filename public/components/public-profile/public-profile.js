angular.module( 'controllers' ).controller('PublicProfileCtrl', ['$scope','$http', '$window',
  function ($scope, $http, $window) {
    var url = $window.location.hash.split('/');
    var userId = url[url.length-1];
    $http.get(`/api/search?search=books&userId=${$window.localStorage.temp}`)
         .then( function(res) {
            delete $window.localStorage.temp;
            console.log(res);
         })
  }
]);
