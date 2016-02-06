angular.module( 'controllers' )
.controller('AdminCtrl', [ '$scope', '$http',

  function( $scope, $http ) {

    $http.get('/api/admin')
      .then( function(res) {
        if (res.status !== 200) {
          $window.location.assign( '/#' );
        } else {
        $http.get('api/titles?count=true')
          .then( function (res) {
            if (res.status === 200) $scope.titles = res.data;
            else $scope.error = 'Could not get titles'
          })
          .catch( function(err) {
            $scope.error = "Could not get titles: " + err;
          });
        }
      });

    $scope.delete = function (title, index) {
      $http({
        method: 'DELETE',
        url: '/api/titles/' + title._id
      }).then( function(res) {
        if (res.status === 200) {
          $scope.titles.splice(index, 1);
        } else {
          $scope.error = 'Could not delete';
        }
      })
      .catch( function(err) {
        $scope.error = 'Could not delete';
      });
    }

    $scope.populate = function (title, index) {
      $scope.editId = title._id;
      $scope.editTitle = title.title;
      $scope.editAuthor = title.author;
      $scope.editSummary = title.summary;
      $scope.editIndex = index;
    }

    $scope.edit = function (book_id, title, author, summary, index) {
      $http.patch(`api/titles/${book_id}`,
                  {
                    title: title,
                    author: author,
                    summary: summary
                  })
      .then( function(res) {
        if (res.status === 200) {
          $scope.titles[index].title = res.data.title;
          $scope.titles[index].author = res.data.author;
          $scope.titles[index].summary = res.data.summary;
          $scope.editTitle = '';
          $scope.editAuthor = '';
          $scope.editSummary = '';
          $scope.editId = undefined;
        } else {
          $scope.error = 'Could not edit';
        }
      })
      .catch( function(err) {
        $scope.error = 'Could not edit';
      });

    }

  }


]);
