angular.module('commuter.register', ['lbServices', 'ionic'])
    .controller('RegisterCtrl', function ($scope, User, $ionicPopup, $location) {

        $scope.registration = {};



        if (User.getCachedCurrent()!==null) {
            $location.path('tab/tap');
        }

        $scope.register = function () {
            $scope.registration.created = new Date().toJSON();


            $scope.user = User.create($scope.registration)
                .$promise
                .then(function (res) {
                            User.login({include: 'user', rememberMe: true}, $scope.registration)
                                .$promise
                                .then(function (res) {
                                    $location.path('tab/tap')
                                }, function (err) {
                                    $scope.loginError = err;
                                    $scope.showAlert(err.statusText, err.data.error.message);
                                })
                        }, function (err) {
                            console.log(err);
                        })
                }, function (err) {
                    $scope.registerError = err;
                    $scope.showAlert(err.statusText, err.data.error.message);
           //     });
        };


        $scope.showAlert = function (title, errorMsg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: errorMsg
            });
            alertPopup.then(function () {
                console.log($scope.loginError);
            });
        };
    });
