(function () {

  angular
    .module('pingFyp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['authentication','$location'];
  function registerCtrl(authentication,$location) {
    var vm = this;

    vm.pageHeader = {
      title: 'Create a new PING account'
    };

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };


    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doRegister();
      }
    };

    vm.doRegister = function() {
      vm.formError = "";
      authentication
        .register(vm.credentials)
        .error(function(err){
          if (err.name == 'ValidationError') {
   vm.formError="Email is already taken";
  } else {
    vm.formError = err;
  }
          
        })
        .then(function(){
          $location.path('/login');
        });
    };

  }

})();