angular.module('looper.home', ['lbServices'])
.controller('HomeCtrl', function ($scope, $location, User) {
    $scope.currentUser = User.getCurrent();



    function  getAmmountFromArduino(cb){
        //TODO comunicate with arduino
        cb(-5);
    };

    $scope.update = function () {

        getAmmountFromArduino(function(ammount){
            User.updateBalance({
                ammount: ammount,
                userID: $scope.currentUser.id
            })
                .$promise
                .then(
                function (res) {

                    alert("you have spend " + ammount + ". \nyour new balance is " + res.newBalance);
                    $scope.result = angular.copy(res.newBalance);
                },
                function (err) {
                    console.log(err);
                });
        })
         
    };
})