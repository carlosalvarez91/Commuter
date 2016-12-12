angular.module('commuter.login', ['lbServices', 'ionic'])
    .controller('LoginCtrl', function ($scope, User, $location, $ionicPopup) {
        if (User.getCachedCurrent()!==null) {
           $location.path('tab/tap');
        }

        $scope.credentials = {};


        $scope.showAlert = function (title, errorMsg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: errorMsg
            });
            alertPopup.then(function (res) {
                console.log($scope.loginError);
            });
        };


        $scope.login = function () {
            $scope.loginResult = User.login({include: 'user', rememberMe: true}, $scope.credentials,
                function () {
                    var next = $location.nextAfterLogin || 'tab/tap';
                    $location.nextAfterLogin = null;
                    $location.path(next);
                },
                function (err) {
                    $scope.loginError = err;
                    $scope.showAlert(err.statusText, err.data.error.message);
                }
            );
        };
        $scope.goToRegister = function () {
            $location.path('register');
        };


    });