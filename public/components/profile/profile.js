angular.module('controllers')

.controller( 'ProfileCtrl', [ '$scope', '$http', '$window',
  function( $scope, $http, $window ) {

      if ( !$window.localStorage.token ) {
          $window.location.assign( '/#' );
      }

      $http.get('/api/profile/')
      .then( res => {
          $scope.username = res.data.username;
          $scope.id = res.data.id;
          $scope.about = res.data.about;
          $scope.picture = 'https://graph.facebook.com/' + $scope.id + '/picture?height=200&width=200';
          $http.get('/api/books?owner=' + $scope.id)
              .then( res => {
                $scope.books = res.data;
                })
              .catch( err => {
                console.log(err[0]);
                });
            })
            .catch( err => { console.log( err[0] ); });


      $http.get('/api/profile/books?search=borrowing')
         .then( res => {
            $scope.borrowing = res.data;
            })
        .catch( err => {
            console.log(err[0]);
        });


      $scope.addbook = function(  title, author, comment ){

          console.log('values', title, author, comment);

          $http.post( '/api/profile/books',
                    {   title: title,
                        author: author,
                        comment: comment}
                    )
              .then (console.log('wrote new record to book list') )
              .catch(err)
      };


      $http.get('/api/profile/books?search=lending')
      .then( res => {
        $scope.lending = res.data;
      })
      .catch( err => {
        console.log(err[0]);
      });

      $scope.delete = function(book_id, index) {
        $http({
          method: 'DELETE',
          url: '/api/profile/delete/' + book_id
        }).then( res => {
          $scope.deleteResponse = res.data;
          $scope.books.splice(index, 1);
        })
        .catch( err => {
          console.log(err);
        });
      }

  }
]);
