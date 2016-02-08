angular.module( 'controllers' )
.controller('PublicProfileCtrl', ['$rootScope', '$routeParams', '$scope','$http',

    function ($rootScope, $routeParams, $scope, $http) {

        var ID = $routeParams.id;

        //get books for that profile id
        $http.get(`/api/books?owner=${ID}`)
            .then( function(res) {
                $scope.books = res.data;
            });

        // get user name for that profile id
        $http.get('api/users/'+ ID)
            .then(function(res){
                $scope.name = res.data.username;
                $scope.about = res.data.about;
                $scope.picture = 'https://graph.facebook.com/' + ID + '/picture?height=150&width=150';
            })
            .catch(function(err) {
            $scope.error = 'Could not retrieve user info';
          });

    }
]);
