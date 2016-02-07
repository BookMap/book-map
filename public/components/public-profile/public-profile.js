angular.module( 'controllers' )
.controller('PublicProfileCtrl', ['$rootScope', '$routeParams', '$scope','$http',

    function ($rootScope, $routeParams, $scope, $http) {

        //get either the member id or if none the logged in user id
        var ID = $routeParams.id || $rootScope.Id;

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
                $scope.picture = 'https://graph.facebook.com/'
                    + ID + '/picture?height=150&width=150';

            })
            .catch(function(err) {
            $scope.error = 'Could not retrieve user info';
          });

    }
]);
