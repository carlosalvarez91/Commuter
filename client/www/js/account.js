angular.module('looper.account', ['lbServices', 'ionic'])
    .controller('AccountCtrl', function ($scope, $location, User) {
        $scope.currentUser = User.getCurrent();
        


        $scope.logout = function () {
            User.logout(function () {
                $location.path('/login');
            });
        }

    });