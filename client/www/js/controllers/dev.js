angular.module('commuter.dev', [])

.controller('DevCtrl', function($scope, StripeCharge, User) {


  selectOptions = [5, 10, 15, 20, 30];
  selectAmmount = 0,
  $scope.currentUser = User.getCurrent();

  $scope.status = {
    loading: false,
    message: "",
  };

  $scope.update = function(ammount) {

    $scope.status['loading'] = true;
    $scope.status['message'] = "Retrieving your Stripe Token...";

    // first get the Stripe token
    StripeCharge.getStripeToken($scope.selectAmmount).then(
      function(stripeToken){
        // -->
        proceedCharge(stripeToken);
      },
      function(error){
        console.log(error)

        $scope.status['loading'] = false;
        if(error != "ERROR_CANCEL") {
          $scope.status['message'] = "Oops... something went wrong";
        } else {
          $scope.status['message'] = "";
        }
      }
    ); // ./ getStripeToken

    function proceedCharge(stripeToken) {

      $scope.status['message'] = "Processing your payment...";

      // then chare the user through your custom node.js server (server-side)
      StripeCharge.chargeUser(stripeToken, $scope.selectAmmount).then(
        function(StripeInvoiceData){
          
          if(StripeInvoiceData.hasOwnProperty('id')) {
            $scope.status['message'] = "Success! Check your Stripe Account";
          } else {
            $scope.status['message'] = "Error, check your console";
          };
          $scope.status['loading'] = false;
          console.log(StripeInvoiceData)
        },
        function(error){
          console.log(error);

          $scope.status['loading'] = false;
          $scope.status['message'] = "Oops... something went wrong";
        }
      );

    };
     //////////// UPDATE BALANCE     
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

})
