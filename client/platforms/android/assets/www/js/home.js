angular.module('looper.home', ['lbServices'])
.controller('HomeCtrl', function ($scope, $location, User) {
    $scope.currentUser = User.getCurrent();

})