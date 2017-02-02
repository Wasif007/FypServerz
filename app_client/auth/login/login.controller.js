(function () {

  angular
    .module('pingFyp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['authentication','$location'];
  function loginCtrl(authentication,$location) {
    var vm = this;

    vm.pageHeader = {
      title: 'Login in to PING'
    };

    vm.credentials = {
      email : "",
      password : ""
    };


    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          if(err.message="Incorrect Password")
          {
            vm.formError="Password doesnot matches";
          }
          else{
          vm.formError = err;
        }
        })
        .then(function(){
          $location.path('/supervisor');
        });
    };

  }

})();