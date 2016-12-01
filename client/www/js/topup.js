angular.module('commuter.dev', ['lbServices', 'ionic'])
    .controller('TopUpCtrl', function ($scope, User) {

        selectOptions = [5, 10, 15, 20, 30];
        selectAmmount = 0,
            $scope.currentUser = User.getCurrent();

        $scope.update = function (ammount) {
            User.updateBalance({
                ammount: ammount,
                userID: $scope.currentUser.id
            })
                .$promise
                .then(
                function (res) {

                    alert("you have topped up " + ammount + ". \nyour new balance is " + res.newBalance);
                    $scope.result = angular.copy(res.newBalance);
                },
                function (err) {
                    console.log(err);
                });

            
        };

    });