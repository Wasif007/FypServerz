(function () {

  angular.module('pingFyp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/signup',{
        templateUrl:'/auth/register/register.view.html',
        controller:'registerCtrl',
        controllerAs:'vm'
      })
      .when('/login',{
        templateUrl:'/auth/login/login.view.html',
        controller:'loginCtrl',
        controllerAs:'vm'
      })
      .when('/supervisor',{
        templateUrl:'/supervisor/supervisor.view.html',
        controller:'supervisorCtrl',
        controllerAs:'vm'
      })
      .when('/modules',{
        templateUrl:'/modules/modules.view.html',
        controllerAs:'vm',
        controller:'modulesCtrl'
      })
      .when('/addguard',{
        templateUrl:'/addguard/addguard.view.html',
        controller:'addguardCtrl',
        controllerAs:'vm'
      })
       .when('/history',{
        templateUrl:'/history/history.view.html',
        controller:'historyCtrl',
        controllerAs:'vm'
      })
      .when('/assign',{
        templateUrl:'/assign/assign.view.html',
        controller:'assignCtrl',
        controllerAs:'vm'
      })
      .otherwise({redirectTo: '/login'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }
  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }

  angular
    .module('pingFyp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);


})();