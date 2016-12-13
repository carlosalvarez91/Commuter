//STRIPE
var NOODLIO_PAY_API_URL         = "https://noodlio-pay.p.mashape.com"; 
var NOODLIO_PAY_API_KEY         = "0oowTZBJ9VmshckKyvhqZh6jWTICp1upeGljsnhdGboGhVjZOp";
var NOODLIO_PAY_CHECKOUT_KEY    = {test: "pk_test_k1SD2sVRUbmaTxvyyWrhVTBB", live: "pk_live_FQs6FMNbWneaFDP9jd5hJa36"};
var STRIPE_ACCOUNT_ID           = "acct_185bZuBajnfE1rcS";
var TEST_MODE = true;
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('commuter', ['commuter.topup','commuter.account','commuter.tap','commuter.login','commuter.register', 'ionic','lbServices','bd.timedistance','commuter.dev','commuter.stripeservices','stripe.checkout','nfcFilters','commuter.ionicNFC'])

    /*.run(function ($ionicPlatform) {
     $ionicPlatform.ready(function () {
     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
     // for form inputs)
     if (window.cordova && window.cordova.plugins.Keyboard) {
     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
     }
     if (window.StatusBar) {
     StatusBar.styleDefault();
     }
     });
     })*/

    .run(function (User) {
     
        if (User.getCachedCurrent() == null) {
            User.getCurrent();
        }
    })
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, StripeCheckoutProvider) {
        
  
  switch (TEST_MODE) {
    case true:
      
      StripeCheckoutProvider.defaults({key: NOODLIO_PAY_CHECKOUT_KEY['test']});
      break
    default:
      
      StripeCheckoutProvider.defaults({key: NOODLIO_PAY_CHECKOUT_KEY['live']});
      break
  };
  
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            })
            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.tap', {
                url: '/tap',
                views: {
                    'tap-tab': {
                        templateUrl: 'templates/tap.html',
                        controller: 'TapCtrl'
                    }
                }
            })
            .state('tabs.topup', {
                url: '/topup',
                views: {
                    'topup-tab': {
                        templateUrl: 'templates/topup.html',
                        controller: 'TopUpCtrl'
                    }
                }
            })
           .state('tabs.dev', {
                url: '/dev',
                views: {
                    'dev-tab': {
                        templateUrl: 'templates/dev.html',
                        controller: 'DevCtrl',
                         resolve: {
                             // checkout.js isn't fetched until this is resolved.
                         stripe: StripeCheckoutProvider.load
                        }
                    }
                }
            })
            .state('tabs.account', {
                url: '/account',
                views: {
                    'account-tab': {
                        templateUrl: 'templates/account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });
            

        $urlRouterProvider.otherwise('/login');

        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                responseError: function (rejection) {
                    console.log("Redirect");
                    if (rejection.status == 401 && $location.path() !== '/login' && $location.path() !== '/register') {
                        $location.nextAfterLogin = $location.path();
                        $location.path('/login');
                     }
                    return $q.reject(rejection);
                }
            };
        });
        
        
    })
;