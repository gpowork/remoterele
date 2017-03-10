// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://myiot-e48e3.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})
.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//myiot-e48e3.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})
.controller("ListCtrl", function($scope, Items, Auth, $firebaseObject) {
  $scope.items = Items;
  console.log(Items)
  $scope.addItem = function() {
    var name = prompt("What do you need to buy?");
    if (name) {
      $scope.items.$add({
        "name": name
      });
    }
  };
  var fb = new Firebase("https//myiot-e48e3.firebaseio.com/fermas");
  $scope.fermas = $firebaseObject(fb) || {
    "0" : {
      state : false,
      command : "",
      name : "factory 1"
    }, 
    "1" : {
      state : false,
      command : "",
      name : "factory 2"
    }, 
    "2" : {
      state : false,
      command : "",
      name : "factory 3"
    }
  };
  $scope.pushToFactory = function(fNumber){
    console.log(fNumber)
  }
  $scope.updateValue = function() {
    var objToSave = {};
    for(var k in $scope.fermas) {
      if (!isNaN(k))
        objToSave[k] = $scope.fermas[k];
    }
      console.log(objToSave)
      fb.update(objToSave);
  }
});
//myiot-e48e3
// https://auth.firebase.com/v2/myiot-e48e3/auth/facebook/callback