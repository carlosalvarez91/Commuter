angular.module('commuter.tap', ['lbServices'])
.controller('TapCtrl', function ($scope, $location, User) {
    $scope.currentUser = User.getCurrent();



    function  tap(cb){
        cb(-5);
    };

    $scope.update = function () {
// Integrate here nfc.addNdefListener() https://github.com/don/ionic-nfc-reader/blob/master/www/js/app.js
        tap(function(ammount){
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