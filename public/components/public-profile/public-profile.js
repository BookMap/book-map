angular.module( 'controllers' ).controller('PublicProfileCtrl', ['$rootScope', '$routeParams', '$scope','$http', '$window',

    function ($rootScope, $routeParams, $scope, $http, $window) {

        //get either the member id or if none the logged in user id
        var blob = $routeParams.id || $rootScope.Id;

        //get books for that profile id
        $http.get(`/api/books?owner=${blob}`)
            .then( function(res) {
                $scope.books = res.data;
            });


        // get user name for that profile id
        $http.get('api/users/'+ blob)
            .then(function(res){
                console.log(res.data.username, 'some response to blob');

                $scope.name = res.data.username;
                $scope.about = res.data.about;
                $scope.picture = 'https://graph.facebook.com/'
                    + blob + '/picture?height=150&width=150';

            })
            .catch(function(err)
            {console.log(err,': Could not user info for profile.'); })


        //$http.get('/')
        //    .then( function (res) {
        //
        //        console.log(res.data.name, ' is res ');
        //
        //        $scope.name = res.data.name;
        //        $scope.id  = res.data.id;
        //        $scope.about = res.data.about;
        //        $scope.picture = 'https://graph.facebook.com/'
        //            + blob + '/picture?height=150&width=150';
        //
        //    })
        //    .catch(function(err){console.log(err,': Could not get                                 picture or other info for public profile.'); })

    }
]);


