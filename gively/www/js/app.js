// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ngSanitize', 'ionMDRipple', 'ionic-material', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $ionicPopup, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      if (ionic.Platform.isAndroid()) {
        StatusBar.backgroundColorByHexString("#D64541");
      } else {
        StatusBar.styleLightContent();
      }
    }
  window.addEventListener('native.keyboardshow', function(){
    document.body.classList.add('keyboard-open');
  })


  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home-create', {
    url: '/home-create',
    cache: false,
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'home'
      }
    }
  })

  .state('tab.home-create-group', {
    url: '/home-create-group',
    cache: false,
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-group.html',
        controller: 'group'
      }
    }
  })


  .state('tab.home', {
      url: '/home',
      cache: false,
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'home'
        }
      }
    })

  .state('tab.home-list', {
      url: '/home-list',
      cache: false,
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-list.html',
          controller: 'list'
        }
      }
    })

  .state('tab.home-list-item', {
      url: '/home-list/:item',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-items.html',
          controller: 'items',
          cache: false,
          params: {
              item: null
          }
        }
      }
    })

  .state('tab.home-list-itemg', {
      url: '/home-listg/:item/:index',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-items-group.html',
          controller: 'itemsGroup',
          cache: false,
          params: {
              item: null,
              index: null
          }
        }
      }
    })


  .state('tab.home-list-item-alpha', {
      url: '/home-list-alpha/0',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home-items-alpha.html',
          controller: 'itemsAlpha',
          cache: false,
          params: {
              item: 0
          }
        }
      }
    })

  .state('tab.home-public', {
      url: '/home-public',
      cache: true,
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-public.html',
          controller: 'public'
        }
      }
    })

  .state('tab.home-public-item', {
      url: '/home-public/:code',
      cache: true,
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-public-item.html',
          controller: 'public-item'
        }
      }
    })

  .state('tab.home-public-grid', {
      url: '/home-public-grid',
      cache: true,
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-public-grid.html',
          controller: 'public-grid'
        }
      }
    })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

})


.controller('home', function($scope, $rootScope, $http, ionicMaterialInk, ionicMaterialMotion, $timeout, $compile, $ionicPopup, $window, $cordovaClipboard, $cordovaNetwork) {

  
  $scope.screenHeight = $window.screen.height/5+'px;'
  $scope.screenWidth = $window.screen.width+'px;'
  $scope.hideBar = true;
  $timeout(function(){
    ionicMaterialInk.displayEffect();
  },500);




  $scope.rateUs = function () {
    window.open('market://details?id=com.ionicframework.giftly145676', '_system', 'location=yes');
  }

  $scope.donate = function() {
       swal(
      'Not yet 😁',
      'Donation is in the build',
      'info'
    )
  }

  $scope.colors = function (index) {
    var myShows = ['#D64541', 
                  '#E74C3C', 
                  '#F27935', 
                  '#F4B350', 
                  '#87D37C', 
                  '#66CC99', 
                  '#86E2D5', 
                  '#2ABB9B',
                  '#16a085',
                  '#049372',
                  ];

    if (index > myShows.length) {
      index = index % 10
    }
    if (index === 10) {
      index = 0
    }
    return {color:myShows[index]};
    console.log(myShows[index])
}



  $scope.items = {};
  $scope.items.title_name = 'My Wishlist'
  $scope.items.item0Name = "Great pair of socks"
  
  $scope.itemName = ""

  $scope.index = 0
  $scope.title1 = false
  $scope.addItem = function(index) {
    i = $scope.index + 1
    $scope.index = $scope.index + 1
    


    console.log($scope.index)
    var html='<div id="card'+i+'" class="list card card-dash stable-bg animated bounceIn" ng-controller="uploadPic">\
                <div style="border-left:6px solid;" ng-style="{{colors('+i+')}}" class="item ink" ion-ripple ion-ripple-color="#bdc3c7" data-ink-opacity=".2"><div ng-show="!items.item'+i+'">\
                  <div ng-click="items.item'+i+'=true">\
                    <p ng-if="items.item'+i+'Name"><p ng-if="items.item'+i+'Name">{{items.item'+i+'Name}}</p> <p ng-if="items.item'+i+'Name==undefined">Great pair of socks</p></p>\
                  </div>\
                    <i ng-click="addItem('+i+')" class="item-text-wrap add-new ion-plus-circled" style="font-size:25px;top:15px;color:#87D37C;"></i>\
                    <p style="font-size:15px;color:#87D37C;" ng-click="items.item'+i+'=true">{{items.item'+i+'Link}}</p>\
                </div>\
                <div ng-show="items.item'+i+'==true">\
                <i class="ion-trash-b trash ink" aria-hidden="true" ng-click="remove('+i+')"></i>\
                  <label class="item-input">\
                    <input type="text" ng-model="items.item'+i+'Name" placeholder="Great pair of socks" ion-ripple ion-ripple-color="#bdc3c7" data-ink-opacity=".1">\
                  </label>\
                  <p style="z-index:9;margin-left:10px;margin-bottom:-5px;left:5px;position:relative;top:10px;color:#87D37C;">Where to get it?</p>\
                    <input style="margin-bottom:10px;margin-top:12px;margin-left:15px" type="text" ng-model="items.item'+i+'Link" placeholder="amazon.com/pair-of-socks" ion-ripple ion-ripple-color="#bdc3c7">\
                  </label>\
                  <button ng-click="items.item'+i+'=True" style="z-index:9;float:right;bottom:15px;position:absolute;width:40px;height:40px;right:20px;" ng-show="items.item'+i+'Name" class="button button-fab button-outline button-small button-balanced ion-checkmark-round"></button>\
                  <div ng-if="items.item'+i+'Image">\
                    <img ng-click="Picture('+i+')" class="circle animated fadeIn ink" style="position:relative;bottom:15px;float:left;left:10px;margin-bottom:-20px;z-index:9999;background-image: url({{items.item'+i+'Image}})"/>\
                  </div>\
                  <button ion-ripple ion-ripple-color="#bdc3c7" ng-show="!items.item'+i+'Image" ng-click="Picture('+i+')" style="position:relative;width:40px;height:40px;left:10px;bottom:0px;" class="ion-image button button-fab button-outline button-small button-balanced"></i>\
                </div>\
              </div>'



    el = document.getElementById('items');
    angular.element(el).append( $compile(html)($scope) )

  }

$scope.remove = function(card) {
  card = '#card'+card
  console.log(card)
  var myEl = angular.element( document.querySelector(card) );
  myEl.remove(); 
  $scope.index = $scope.index - 1
}


$scope.confirm = function() {

  $scope.items.index = $scope.index
  $scope.items.code = Math.floor((Math.random()*6000000000)+1);
  console.log($scope.items.title_name)
  $http.post('http://gively.me/create_gively', {'gively':$scope.items}).then(function(res){

  });
  window.history.back();

  $scope.showConfirm();
}

 $scope.showConfirm = function() {
   $scope.shareURL = "http://gively.me/"+$scope.items.code
   $scope.items.shareURL= "http://gively.me/"+$scope.items.code
   listItem = $scope.items
   //Append to localstorage
   try {
     GIVELYS = JSON.parse($window.localStorage.getItem("givelys"))['givelys'];
     GIVELYS.push(listItem);
   }
   catch (err) {
    GIVELYS = [listItem];
   }

   $window.localStorage.setItem('givelys', JSON.stringify({'givelys':GIVELYS}));
   console.log($window.localStorage.getItem("givelys"))

   if ($cordovaNetwork.isOnline() == false) {
     var confirmPopup = $ionicPopup.alert({
       cssClass: 'popupFail',
       template: '<center>😢<br>No internet?<br>Your new created Givelys won\'t be share-able until you update your Gively when you are connected.<br>',
       buttons : [
       {type: 'button-balanced',
       text: '<b>Ok!</b>'}
       ]
       
     })
   }
   
   else {

     var confirmPopup = $ionicPopup.alert({
       title: '<i class="popup-title-confirm ion-checkmark-circled"></i>',
       cssClass: 'popupFail animated bounceIn',
       template: '<center><p style="margin-top:20px;" class="popup-text">Your Gively is saved<br>😊<br>Share the link with your friends!<br><br><input class="url-input" style="border: 3px solid #33cd5f;" type="text" value="'+$scope.items.shareURL+'" disabled>',
       buttons : [
       {type: 'button-balanced',
       text: '<b>Ok!</b>'},
       {type:'button-balanced',
        text:'<b><i class="ion-earth"></i></b>',
          onTap: function(e) {
            $scope.open($scope.items.shareURL);
          }
        }
       ]
       
     });

    $scope.open = function (url) {
      window.open(url, '_system', 'location=yes');
    }
   }


 }




  $scope.copy = function() {
       $cordovaClipboard.copy($scope.shareURL).then(function() {
          console.log("Copied text");
      }, function() {
          console.error("There was an error copying");
      });
  }

  $scope.back = function() {
    window.history.back();
  }

  if (!$rootScope.loaded){
    if (ionic.Platform.isAndroid()) {
      ionic.Platform.ready(function() {
        if (ionic.Platform.isAndroid()) {
          StatusBar.backgroundColorByHexString("#D64541");
        } else {
          StatusBar.styleLightContent();
        }
      })
      


    
      $scope.splash = true
      $timeout(function(){
          document.getElementById("custom-overlay").style.display = "none"; 
          $scope.splash = false
          $rootScope.loaded = true

          ionic.Platform.ready(function() {
            if (ionic.Platform.isAndroid()) {
              StatusBar.backgroundColorByHexString("#D64541");
            } else {
              StatusBar.styleLightContent();
            }
          })

      }, 3000);
    }
    else{
    $rootScope.loaded = true;
    }
  }


  try {
    $scope.first = JSON.parse($window.localStorage.getItem("first"))['first']
  }
  catch (err) {
    $timeout(function(){
              document.getElementById("group-balloon").style.display = "none"; 
    }, 4000);
    $window.localStorage.setItem('first', JSON.stringify({'first':true}));
  }




})


.controller('group', function($scope, $http, ionicMaterialInk, ionicMaterialMotion, $timeout, $compile, $ionicPopup, $window, $cordovaClipboard, $cordovaSocialSharing, $cordovaNetwork) {

  $scope.items = {};

  $scope.colors = function (index) {
    var myShows = ['#D64541', 
                  '#E74C3C', 
                  '#F27935', 
                  '#F4B350', 
                  '#87D37C', 
                  '#66CC99', 
                  '#86E2D5', 
                  '#2ABB9B',
                  '#16a085',
                  '#049372',
                  ];

    if (index > myShows.length) {
      index = index % 10
    }
    if (index === 10) {
      index = 0
    }
    return {color:myShows[index]};
    console.log(myShows[index])
  }






  swal.setDefaults({
    
    input: 'text',
    confirmButtonText: 'Next',
    confirmButtonColor: '#87D37C',
    showCancelButton: false,
    showCloseButton: true,
    animation: true,
    progressSteps: ['1', '2']
  })

  var steps = [
    {
      text: 'What is your name? 😊',
      inputPlaceholder: 'Brian',
    },
    {
      text: 'Who is this whislist for? 🎁',
      inputPlaceholder: 'Eric',
    }
  ]
  
  swal.queue(steps).then(function (result) {
    swal.resetDefaults()
    $scope.items.name0 = result[0]
    $scope.items.friend = result[1]
    $scope.items.title_name = $scope.items.friend + "'s birthday 🍾🎂 "
    $scope.$apply()
    swal(
      'Tip!',
      'Let friends add their gifts by sending them the link after you saved!',
      'info'
    )
  })

  $scope.items = {};
  $scope.items.item0Name = "Great pair of socks"
  $scope.index = 0
  $scope.title1 = false

  $scope.addItem = function(index) {
    i = $scope.index + 1
    $scope.index = $scope.index + 1
    $scope.items['name'+$scope.index] = $scope.items.name0
    


    console.log($scope.index)
    var html='<div id="card'+i+'" class="list card card-dash stable-bg animated bounceIn" ng-controller="uploadPic">\
                <div style="border-left:6px solid;" ng-style="{{colors('+i+')}}" class="item ink" ion-ripple ion-ripple-color="#bdc3c7" data-ink-opacity=".2">\
                  <div ng-show="!items.item'+i+'">\
                    <div ng-click="items.item'+i+'=true">\
                      <b style="font-size:15px;color:#87D37C;">{{items.name0}}</b> <p style="color:grey;">is giving {{items.friend}}:</p> <p style="margin-top:10px;"><p ng-if="items.item'+i+'Name">{{items.item'+i+'Name}}</p> <p ng-if="items.item'+i+'Name==undefined">Great pair of socks</p></p>\
                    </div>\
                    <i ng-click="addItem('+i+')" class="item-text-wrap add-new ion-plus-circled" style="font-size:25px;top:15px;color:#87D37C;"></i>\
                    <p style="font-size:15px;color:#87D37C;" ng-click="items.item'+i+'=true">{{items.item'+i+'Link}}</p>\
                </div>\
                <div ng-show="items.item'+i+'==true">\
                <i class="ion-trash-b trash ink" aria-hidden="true" ng-click="remove('+i+')"></i>\
                  <label class="item-input">\
                    <input type="text" ng-model="items.item'+i+'Name" placeholder="Great pair of socks" ion-ripple ion-ripple-color="#bdc3c7" data-ink-opacity=".1">\
                  </label>\
                  <p style="z-index:9;margin-left:10px;margin-bottom:-5px;left:5px;position:relative;top:10px;color:#87D37C;">Where to get it?</p>\
                    <input style="margin-bottom:10px;margin-top:12px;margin-left:15px" type="text" ng-model="items.item'+i+'Link" placeholder="amazon.com/pair-of-socks" ion-ripple ion-ripple-color="#bdc3c7">\
                  </label>\
                  <button ng-click="items.item'+i+'=True" style="z-index:9;float:right;bottom:15px;position:absolute;width:40px;height:40px;right:20px;" ng-show="items.item'+i+'Name" class="button button-fab button-outline button-small button-balanced ion-checkmark-round"></button>\
                  <div ng-if="items.item'+i+'Image">\
                    <img ng-click="Picture('+i+')" class="circle animated fadeIn ink" style="position:relative;bottom:15px;float:left;left:10px;margin-bottom:-20px;z-index:9999;background-image: url({{items.item'+i+'Image}})"/>\
                  </div>\
                  <button ion-ripple ion-ripple-color="#bdc3c7" ng-show="!items.item'+i+'Image" ng-click="Picture('+i+')" style="position:relative;width:40px;height:40px;left:10px;bottom:0px;" class="ion-image button button-fab button-outline button-small button-balanced"></i>\
                </div>\
              </div>'



    el = document.getElementById('items');
    angular.element(el).append( $compile(html)($scope) )

  }

$scope.remove = function(card) {
  card = '#card'+card
  console.log(card)
  var myEl = angular.element( document.querySelector(card) );
  myEl.remove(); 
  $scope.index = $scope.index - 1
}


$scope.confirm = function() {

  $scope.items.index = $scope.index
  $scope.items.code = 'g'+Math.floor((Math.random()*6000000000)+1);
  console.log($scope.items.title_name)

  $http.post('http://gively.me/create_gively', {'gively':$scope.items}).then(function(res){

  });
  window.history.back();
  window.history.back();

  $scope.showConfirm();
}

 $scope.showConfirm = function() {
   $scope.shareURL = "http://gively.me/"+$scope.items.code
   $scope.items.shareURL= "http://gively.me/"+$scope.items.code
   listItem = $scope.items
   //Append to localstorage
   try {
     GIVELYS = JSON.parse($window.localStorage.getItem("givelys"))['givelys'];
     GIVELYS.push(listItem);
   }
   catch (err) {
    GIVELYS = [listItem];
   }

   $window.localStorage.setItem('givelys', JSON.stringify({'givelys':GIVELYS}));
   console.table($scope.items)

   if ($cordovaNetwork.isOnline() == false) {
     var confirmPopup = $ionicPopup.alert({
       cssClass: 'popupFail',
       template: '<center>😢<br>No internet?<br>Your new created Givelys won\'t be share-able until you update your Gively when you are connected.<br>',
       buttons : [
       {type: 'button-balanced',
       text: '<b>Ok!</b>'}
       ]
       
     })
   }
   
   else {

     var confirmPopup = $ionicPopup.alert({
       title: '<i class="popup-title-confirm ion-checkmark-circled"></i>',
       cssClass: 'popupFail animated bounceIn',
       template: '<center><p style="margin-top:20px;" class="popup-text">Your Gively is saved<br>😊<br>Share the link with your friends!<br><br><input class="url-input" style="border: 3px solid #33cd5f;" type="text" value="'+$scope.items.shareURL+'" disabled>',
       buttons : [
       {type: 'button-balanced',
       text: '<b>Ok!</b>'},
       {type:'button-stable',
        text:'<b>copy</b>',
          onTap: function(e) {
            $scope.copy();
          }
        }
       ]
       
     });
   }


 }


  $scope.copy = function() {
        $cordovaClipboard.copy($scope.shareURL).then(function() {
          console.log("Copied text");
      }, function() {
          console.error("There was an error copying");
      });
  } 



})





.controller('list', function($scope, $http, ionicMaterialInk, ionicMaterialMotion, $timeout, $compile, $ionicPopup, $window, $cordovaClipboard, $cordovaSocialSharing) {
  $scope.hideBar = true;
  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);

  $scope.background = function (index) {
    var myShows = ['#D64541', 
                  '#E74C3C', 
                  '#F27935', 
                  '#F4B350', 
                  '#87D37C', 
                  '#66CC99', 
                  '#86E2D5', 
                  '#2ABB9B',
                  '#16a085',
                  '#049372',
                  ];

    if (index > myShows.length) {
      index = index % 10
    }
    if (index === 10) {
      index = 0
    }
    return {backgroundColor:myShows[index]};

  };


  
  try {
    $scope.givelys = JSON.parse($window.localStorage.getItem("givelys"))['givelys'];
  }
  catch(err) {
    console.log(err)
  }
  if ($scope.givelys) {
    console.log($scope.givelys);
  }
  else {

    console.log('No Givelys yet')
  }


  $scope.copy = function(url) {
     $cordovaClipboard.copy(url).then(function() {
        console.log("Copied text");
    }, function(err) {
        console.error("There was an error copying",err);
    });
  }

  $scope.share = function(url) {
    $cordovaSocialSharing.share("Check out my wishlist 😇 " + url);
  }

  $scope.open = function (url) {
    window.open(url, '_system', 'location=yes');
  }


})


.controller('items', function($scope, $rootScope, $state, $stateParams, $http, ionicMaterialInk, ionicMaterialMotion, $timeout, $compile, $ionicPopup, $window, $cordovaClipboard, $cordovaNetwork, $cordovaCamera, $ionicLoading, $ionicModal) {
  $scope.hideBar = true;
  $scope.title1 = false;
  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);

  index = $stateParams.item;

  $scope.items = {};

  try {
    $scope.givelys = JSON.parse($window.localStorage.getItem("givelys"))['givelys'][index];
    $scope.givelys.index = $scope.givelys.index + 1
    for (i = 0; i < $scope.givelys.index+10; i++){
      $scope.items['item'+i+'Name'] = $scope.givelys['item'+i+'Name']
      $scope.items['item'+i+'Link'] = $scope.givelys['item'+i+'Link']
      $scope.items['item'+i+'Image'] = $scope.givelys['item'+i+'Image']
      //$scope.items['index'] = $scope.givelys['index'] - 1
    }
  }
  catch(err) {
    //console.log(err)
  }
  if ($scope.givelys) {
    //console.log($scope.givelys);
  }
  else {

    console.log('No Givelys yet')
  }


  $scope.colors = function (index) {
    var myShows = ['#D64541', 
                  '#E74C3C', 
                  '#F27935', 
                  '#F4B350', 
                  '#87D37C', 
                  '#66CC99', 
                  '#86E2D5', 
                  '#2ABB9B',
                  '#16a085',
                  '#049372',
                  ];

    if (index > myShows.length) {
      index = index % 10
    }
    if (index === 10) {
      index = 0
    }
    return {borderColor:myShows[index]};
    console.log(myShows[index])
}



  $scope.index = $scope.givelys.index - 1
  $scope.addItem = function(index) {
    i = $scope.index + 1
    $scope.index = $scope.index + 1
    


    console.log($scope.index)
    var html='<div id="card'+i+'" class="list card card-dash stable-bg animated bounceIn" style="width:105%;left:-6px;" ng-controller="uploadPic">\
                <div style="border-left:6px solid;" ng-style="{{colors('+i+')}}" class="item ink" ion-ripple ion-ripple-color="#bdc3c7" data-ink-opacity=".2"><div ng-show="!items.item'+i+'">\
                  <div ng-click="items.item'+i+'=true">\
                    <p ng-if="items.item'+i+'Name"><p ng-if="items.item'+i+'Name">{{items.item'+i+'Name}}</p> <p ng-if="items.item'+i+'Name==undefined">Great pair of socks</p></p>\
                  </div>\
                    <i ng-click="addItem('+i+')" class="item-text-wrap add-new ion-plus-circled" style="font-size:25px;top:15px;color:#87D37C;"></i>\
                    <p style="font-size:15px;color:#87D37C;" ng-click="items.item'+i+'=true">{{items.item'+i+'Link}}</p>\
                </div>\
                <div ng-show="items.item'+i+'==true">\
                <i class="ion-trash-b trash ink" aria-hidden="true" ng-click="remove('+i+')"></i>\
                  <label class="item-input">\
                    <input type="text" ng-model="items.item'+i+'Name" placeholder="Great pair of socks" ion-ripple ion-ripple-color="#bdc3c7" data-ink-opacity=".1">\
                  </label>\
                  <p style="z-index:9;margin-left:10px;margin-bottom:-5px;left:5px;position:relative;top:10px;color:#87D37C;">Where to get it?</p>\
                    <input style="margin-bottom:10px;margin-top:12px;margin-left:15px" type="text" ng-model="items.item'+i+'Link" placeholder="amazon.com/pair-of-socks" ion-ripple ion-ripple-color="#bdc3c7">\
                  </label>\
                  <button ng-click="items.item'+i+'=True" style="z-index:9;float:right;bottom:20px;position:absolute;width:40px;height:40px;right:10px;" ng-show="items.item'+i+'Name" class="button button-fab button-outline button-small button-balanced ion-checkmark-round"></button>\
                  <div ng-if="items.item'+i+'Image">\
                    <img ng-click="Picture('+i+')" class="circle animated fadeIn ink" style="position:relative;bottom:15px;float:left;left:10px;margin-bottom:-20px;z-index:9999;background-image: url({{items.item'+i+'Image}})" on-hold="openModal('+i+')"/>\
                  </div>\
                  <i ng-if="!items.item'+i+'Image" ng-click="Picture('+i+')" style="color:#87D37C;position:relative;left:15px;font-size:20px;" class="ion-image">+</i>\
                  <script  id="my-modal'+i+'.html" type="text/ng-template">\
                    <ion-modal-view style="text-align: center;float:center:margin:0 auto;background: transparent;">\
                      <ion-content ng-click="closeModal('+i+')">\
                        <img style=" margin: 0;position: absolute;top: 50%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%);border-radius:3px;width:70%" ng-src="{{items.item'+i+'Image}}"/>\
                      </ion-content>\
                    </ion-modal-view>\
                  </script>\
                </div>\
              </div>'
    el = document.getElementById('items1');
    angular.element(el).append( $compile(html)($scope) )

  }


  $scope.reOrder = false;
$scope.reOrderC = function() {
  $scope.reOrder = $scope.reOrder === true ? false: true;
}
$scope.moveItem = function(item, fromIndex, toIndex) {
  //Move the item in the array
  $scope.new_G = {}
  $scope.names = []
  $scope.links = []
  $scope.images = []
  for (i = 0; i < $scope.givelys.index; i++){
    $scope.names.push( $scope.items['item'+i+'Name'] )
    $scope.links.push( $scope.items['item'+i+'Link'] )
    $scope.images.push( $scope.items['item'+i+'Image'] )
  }
  //NAMES
  $scope.names.splice(fromIndex, 1);
  $scope.names.splice(toIndex, 0,  $scope.items['item'+item+'Name']);
  //LINKS
  $scope.links.splice(fromIndex, 1);
  $scope.links.splice(toIndex, 0,  $scope.items['item'+item+'Link']);
  //IMAGES
  $scope.images.splice(fromIndex, 1);
  $scope.images.splice(toIndex, 0,  $scope.items['item'+item+'Image']);   
  for (i = 0; i < $scope.givelys.index; i++ ) {
    $scope.new_G['item'+i+'Name'] = $scope.names[i]
    $scope.new_G['item'+i+'Link'] = $scope.links[i]
    $scope.new_G['item'+i+'Image'] = $scope.images[i]

  }
  delete $scope.items
  $scope.items = $scope.new_G
  delete $scope.new_G


};






$scope.remove = function(card) {
  new_G = {}
  cardi = card
  card = '#card'+card
  var myEl = angular.element( document.querySelector(card) );
  myEl.remove();
  $scope.number = [cardi]
  console.log("Deleting: "+$scope.items['item'+cardi+'Name'])
  delete $scope.items['item'+cardi];
  delete $scope.items['item'+cardi+'Name'];
  delete $scope.items['item'+cardi+'Link'];
  delete $scope.items['item'+cardi+'Image'];
  for (var i = 0; i < $scope.index+2; i++) {
    if (i == cardi){
      x = i +1
      new_G['item'+i+'Name'] = $scope.items['item'+x+'Name']
      new_G['item'+i+'Link'] = $scope.items['item'+x+'Link']
      new_G['item'+i+'Image'] = $scope.items['item'+x+'Image']
    }
    else {
      new_G['item'+i+'Name'] = $scope.items['item'+i+'Name']
      new_G['item'+i+'Link'] = $scope.items['item'+i+'Link']
      new_G['item'+i+'Image'] = $scope.items['item'+i+'Image']
    }
    
  }
  delete $scope.items;
  $scope.items = new_G
  $scope.index = $scope.index -1
  console.log($scope.items)


  //$scope.items.index = $scope.items.index - 1
}


 $scope.confirm = function() {
  $ionicLoading.show({
              template:'<div class="icon ion-loading-b"></div>\
              <br />\
              <img src="img/loading.svg"></img>\
               '});
   var all = JSON.parse($window.localStorage.getItem("givelys"))['givelys']
   all[index].title_name = $scope.givelys.title_name
   all[index].shareURL = "http://gively.me/"+$scope.givelys['code']
   for (i = 0; i < $scope.index+2; i++){
    //if ($scope.number.indexOf(i) == -1){
    //if ($scope.items['item'+i+'Name']){
      console.log('---'+$scope.items['item'+i+'Name'])
      all[index]['item'+i+'Name'] = $scope.items['item'+i+'Name']
      all[index]['item'+i+'Link'] = $scope.items['item'+i+'Link']
      all[index]['item'+i+'Image'] = $scope.items['item'+i+'Image']
      //all[index]['item'+i]= 'True'
      all[index]['index'] = $scope.index
      all[index]['shareURL'] = all[index].shareURL
      all[index]['code'] = $scope.givelys['code']
    //}
   }
   listItem =  all
   localStorage.clear();
   $window.localStorage.setItem('givelys', JSON.stringify({'givelys':listItem}));
   console.log($window.localStorage.getItem("givelys"))


   if(window.Connection) {
     if ($cordovaNetwork.isOnline() == false) {
       var confirmPopup = $ionicPopup.alert({
         cssClass: 'popupFail',
         title: 'No internet?',
         template: '<center>😢<br>Your new created Givelys won\'t be share-able until you update your Gively when you are connected.<br>',
         buttons : [
         {type: 'button-balanced',
         text: '<b>Ok!</b>'}
         ]
         
       })
       $ionicLoading.hide();
     }




     else {
       $http.post('http://gively.me/update_gively', {'gively':listItem[index]}).then(function(res){
          console.log(res.data['status'])
          if (res.data['status'] == 'FAILED'){
             $ionicLoading.hide();
             var confirmPopup = $ionicPopup.alert({
               title: '😕',
               cssClass: 'popupFail',
               template: '<center>Failed?<br>I am sorry but we can\'t update your Gively..<br>',
               buttons : [
               {type: 'button-balanced',
               text: '<b>Ok</b>'}]
               });      
            $ionicLoading.hide();
          }
          
          else {
            $ionicLoading.hide();
          }

       })
      }
    }
    else {
       $http.post('http://gively.me/update_gively', {'gively':listItem[index]}).then(function(res){
          console.log(res.data['status'])
          if (res.data['status'] == 'FAILED'){
             $ionicLoading.hide();
             var confirmPopup = $ionicPopup.alert({
               title: '😕',
               cssClass: 'popupFail',
               template: '<center>Failed?<br>I am sorry but we can\'t update your Gively..<br>',
               buttons : [
               {type: 'button-balanced',
               text: '<b>Ok</b>'}]
               });      
            $ionicLoading.hide();
          }
          
          else {
            $ionicLoading.hide();
          }

       })      
    }

   //$window.localStorage.setItem('givelys', JSON.stringify({'givelys':listItem}));
   window.history.back();


  $scope.moveItem = function(item, fromIndex, toIndex) {
    console.log(item)
  };


 }

 $scope.delete = function() {
   var all = JSON.parse($window.localStorage.getItem("givelys"))['givelys']
   all.splice(index,1)
   console.log(all.length)
   localStorage.clear();
   console.log(all.length)

   if (all.length != 0){
    $window.localStorage.setItem('givelys', JSON.stringify({'givelys':all}));
   }
   window.history.back();
   console.log($window.localStorage.getItem("givelys"))
 }



})




.controller('itemsGroup', function($scope, $rootScope, $state, $stateParams, $http, ionicMaterialInk, ionicMaterialMotion, $timeout, $compile, $ionicPopup, $window, $cordovaClipboard, $cordovaNetwork, $cordovaCamera, $ionicLoading, $ionicModal) {
  $ionicLoading.show({
              template:'<div class="icon ion-loading-b"></div>\
              <br />\
              <img src="img/loading.svg"></img>\
               '});

  $scope.hideBar = true;
  $scope.title1 = false;

  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);

  var code = $stateParams.item;
  var index = $stateParams.index;
  $scope.items = {};
  console.log(code)

  $http.get('http://gively.me/api/'+code).then(function(res){
    console.log(res)
    $scope.items = res.data
    $scope.index = $scope.items.index + 1
    console.log($scope.items['title_name'])
    $ionicLoading.hide();

  });

  
  


  $scope.colors = function (index) {
    var myShows = ['#D64541', 
                  '#E74C3C', 
                  '#F27935', 
                  '#F4B350', 
                  '#87D37C', 
                  '#66CC99', 
                  '#86E2D5', 
                  '#2ABB9B',
                  '#16a085',
                  '#049372',
                  ];

    if (index > myShows.length) {
      index = index % 10
    }
    if (index === 10) {
      index = 0
    }
    return {borderColor:myShows[index]};
    console.log(myShows[index])
}




$scope.remove = function(card) {
  new_G = {}
  cardi = card
  card = '#card'+card
  var myEl = angular.element( document.querySelector(card) );
  myEl.remove();
  $scope.number = [cardi]
  console.log("Deleting: "+$scope.items['item'+cardi+'Name'])
  delete $scope.items['item'+cardi];
  delete $scope.items['item'+cardi+'Name'];
  delete $scope.items['name'+cardi];
  delete $scope.items['item'+cardi+'Link'];
  delete $scope.items['item'+cardi+'Image'];
  for (var i = 0; i < $scope.index+2; i++) {
    if (i == cardi){
      x = i +1
      new_G['item'+i+'Name'] = $scope.items['item'+x+'Name']
      new_G['item'+i+'Link'] = $scope.items['item'+x+'Link']
      new_G['item'+i+'Image'] = $scope.items['item'+x+'Image']
      new_G['name'+i] = $scope.items['name'+x]
    }
    else {
      new_G['item'+i+'Name'] = $scope.items['item'+i+'Name']
      new_G['name'+i] = $scope.items['name'+i]
      new_G['friend'] = $scope.items['friend']
      new_G['title_name'] = $scope.items['title_name']
      new_G['code'] = $scope.items['code']
      new_G['item'+i+'Link'] = $scope.items['item'+i+'Link']
      new_G['item'+i+'Image'] = $scope.items['item'+i+'Image']
    }
    
  }
  new_G['index'] = $scope.items['index'] - 1
  delete $scope.items;
  $scope.items = new_G
  console.table($scope.items)


  //$scope.items.index = $scope.items.index - 1
}


 $scope.confirm = function() {
  $ionicLoading.show({
              template:'<div class="icon ion-loading-b"></div>\
              <br />\
              <img src="img/loading.svg"></img>\
               '});

   listItem =  $scope.items


   $http.post('http://gively.me/update_gively', {'gively':listItem}).then(function(res){
      console.log(res.data['status'])
      if (res.data['status'] == 'FAILED'){
         $ionicLoading.hide();
         var confirmPopup = $ionicPopup.alert({
           title: '😕',
           cssClass: 'popupFail',
           template: '<center>Failed?<br>I am sorry but we can\'t update your Gively..<br>',
           buttons : [
           {type: 'button-balanced',
           text: '<b>Ok</b>'}]
           });      
        $ionicLoading.hide();
      }
      
      else {
        $ionicLoading.hide();
      }

   })
   window.history.back();
  }



   $scope.delete = function() {
     var all = JSON.parse($window.localStorage.getItem("givelys"))['givelys']
     all.splice(index,1)
     console.log(all.length)
     localStorage.clear();
     console.log(all.length)

     if (all.length != 0){
      $window.localStorage.setItem('givelys', JSON.stringify({'givelys':all}));
     }
     window.history.back();
     console.log($window.localStorage.getItem("givelys"))
   }


})



.controller('uploadPic', function($scope, $cordovaCamera, $ionicModal) {
  
   $scope.openModal = function(index) {
     $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
     }).then(function(modal) {
        $scope.modal = modal;
     });
        $scope.indexM = index
        $scope.modal.show();
     };
  
   $scope.closeModal = function(index) {
     $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
     }).then(function(modal) {
        $scope.modal = modal;
        $scope.indexM = index
        $scope.modal.hide();
     });
        
     };
  
    $scope.dataImg;
    $scope.Picture = function(index){
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 0,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      correctOrientation:true
      };
     $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.dataImg = imageData; // <--- this is your Base64 string 
        $scope.imgUrl 
        $scope.items['item'+index+'Image'] = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        console.log(err)
      });
    }
})


.controller('public', function($scope, $rootScope, $http, ionicMaterialInk, ionicMaterialMotion, $timeout, $compile, $ionicPopup, $window, $cordovaClipboard, $ionicLoading) {
  $ionicLoading.show({
              template:'<div class="icon ion-loading-b"></div>\
              <br />\
              <img src="img/loading.svg"></img>\
               '});


  $scope.hideBar = true;
  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);


  $http.get('http://gively.me/get_gively/0').then(function(res){
    $scope.givelys = res.data['gively']
    $scope.end = false
    $ionicLoading.hide();
  })


  $scope.loadMore = function(index) {
    console.log(index)
    $http.get('http://gively.me/get_gively/'+index).then(function(res){
      if (res.data['status']){
        $scope.end = true
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.refreshComplete');
      }
      else {
        for (i = 0; i < res.data['gively'].length; i++){
          $scope.givelys.push(res.data['gively'][i])
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.$broadcast('scroll.refreshComplete');
        }
      }
    });
  }


  $scope.background = function (index) {
    var myShows = ['#D64541', 
                  '#E74C3C', 
                  '#F27935', 
                  '#F4B350', 
                  '#87D37C', 
                  '#66CC99', 
                  '#86E2D5', 
                  '#2ABB9B',
                  '#16a085',
                  '#049372',
                  ];

    if (index > myShows.length) {
      index = index % 10
    }
    if (index === 10) {
      index = 0
    }
    return {backgroundColor:myShows[index]};

  };



})


.controller('public-item', function($scope, $rootScope, $state, $stateParams, $http, ionicMaterialInk, ionicMaterialMotion, $timeout, $compile, $ionicPopup, $window, $cordovaClipboard, $ionicLoading) {
  code = $stateParams.code;
  $ionicLoading.show({
              template:'<div class="icon ion-loading-b"></div>\
              <br />\
              <img src="img/loading.svg"></img>\
               '});

  $scope.hideBar = true;
  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);


  $http.get('http://gively.me/api/'+code).then(function(res){
    $scope.gively = res.data
    console.log($scope.gively['title_name'])
    $ionicLoading.hide();

  });

  $scope.colors = function (index) {
    var myShows = ['#D64541', 
                  '#E74C3C', 
                  '#F27935', 
                  '#F4B350', 
                  '#87D37C', 
                  '#66CC99', 
                  '#86E2D5', 
                  '#2ABB9B',
                  '#16a085',
                  '#049372',
                  ];

    if (index > myShows.length) {
      index = index % 10
    }
    if (index === 10) {
      index = 0
    }
    return {borderColor:myShows[index]};
    console.log(myShows[index])
  }


  $scope.goTo = function(url) {
    if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0){
      window.open(url, '_system', 'location=yes');
    }
    else {
      window.open('http://'+url, '_system', 'location=yes');
    }
  }


  })



.controller('public-grid', function($scope, $rootScope, $http, ionicMaterialInk, ionicMaterialMotion, $timeout, $compile, $ionicPopup, $window, $cordovaClipboard, $ionicLoading) {
  $ionicLoading.show({
              template:'<div class="icon ion-loading-b"></div>\
              <br />\
              <img src="img/loading.svg"></img>\
               '});


  $scope.hideBar = true;
  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);


  $http.get('http://gively.me/get_gively/0').then(function(res){
    $scope.givelys = res.data['gively']
    $scope.end = false
    $ionicLoading.hide();
  })


  $scope.loadMore = function(index) {
    console.log(index)
    $http.get('http://gively.me/get_gively/'+index).then(function(res){
      if (res.data['status']){
        $scope.end = true
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.refreshComplete');
      }
      else {
        for (i = 0; i < res.data['gively'].length; i++){
          $scope.givelys.push(res.data['gively'][i])
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.$broadcast('scroll.refreshComplete');
        }
      }
    });
  }


  $scope.background = function (index) {
    var myShows = ['#D64541', 
                  '#E74C3C', 
                  '#F27935', 
                  '#F4B350', 
                  '#87D37C', 
                  '#66CC99', 
                  '#86E2D5', 
                  '#2ABB9B',
                  '#16a085',
                  '#049372',
                  ];

    if (index > myShows.length) {
      index = index % 10
    }
    if (index === 10) {
      index = 0
    }
    return {backgroundColor:myShows[index]};

  };



})



.controller('itemsAlpha', function($scope, $rootScope, $state, $stateParams, $http, ionicMaterialInk, ionicMaterialMotion, $timeout, $compile, $ionicPopup, $window, $cordovaClipboard, $cordovaNetwork, $cordovaCamera, $ionicLoading, $ionicModal) {
  $scope.hideBar = true;
  $scope.title1 = false
  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);

  index = 0
  $scope.reOrder = false
  $scope.reOrderC = function() {
    $scope.reOrder = $scope.reOrder === true ? false: true;
  }
  

  $scope.items = {};

  try {
    $scope.givelys = JSON.parse($window.localStorage.getItem("givelys"))['givelys'][index];
    console.log($scope.givelys)
    $scope.givelys.index = $scope.givelys.index + 1
    for (i = 0; i < $scope.givelys.index + 1; i++){
      $scope.items['item'+i+'Name'] = $scope.givelys['item'+i+'Name']
      $scope.items['item'+i+'Link'] = $scope.givelys['item'+i+'Link']
      $scope.items['item'+i+'Image'] = $scope.givelys['item'+i+'Image']
      //$scope.items['index'] = $scope.givelys['index'] - 1
    }
  }
  catch(err) {
    console.log(err)
  }
  if ($scope.givelys) {
    //console.log($scope.givelys);
  }
  else {

    console.log('No Givelys yet')
  }


  $scope.colors = function (index) {
    var myShows = ['#D64541', 
                  '#E74C3C', 
                  '#F27935', 
                  '#F4B350', 
                  '#87D37C', 
                  '#66CC99', 
                  '#86E2D5', 
                  '#2ABB9B',
                  '#16a085',
                  '#049372',
                  ];

    if (index > myShows.length) {
      index = index % 10
    }
    if (index === 10) {
      index = 0
    }
    return {borderColor:myShows[index]};
}

  $scope.moveItem = function(item, fromIndex, toIndex) {
    //Move the item in the array
    $scope.new_G = {}
    $scope.names = []
    $scope.links = []
    $scope.images = []
    for (i = 0; i < $scope.givelys.index; i++){
      $scope.names.push( $scope.items['item'+i+'Name'] )
      $scope.links.push( $scope.items['item'+i+'Link'] )
      $scope.images.push( $scope.items['item'+i+'Image'] )
    }
    //NAMES
    $scope.names.splice(fromIndex, 1);
    $scope.names.splice(toIndex, 0,  $scope.items['item'+item+'Name']);
    //LINKS
    $scope.links.splice(fromIndex, 1);
    $scope.links.splice(toIndex, 0,  $scope.items['item'+item+'Link']);
    //IMAGES
    $scope.images.splice(fromIndex, 1);
    $scope.images.splice(toIndex, 0,  $scope.items['item'+item+'Image']);   
    for (i = 0; i < $scope.givelys.index; i++ ) {
      $scope.new_G['item'+i+'Name'] = $scope.names[i]
      $scope.new_G['item'+i+'Link'] = $scope.links[i]
      $scope.new_G['item'+i+'Image'] = $scope.images[i]

    }
    delete $scope.items
    $scope.items = $scope.new_G
    delete $scope.new_G


  };


})






.directive('style', ['$compile', function($compile) {
  return {
    restrict: 'E',
    link: function postLink(scope, element) {
      if (element.html()) {
        var template = $compile('<style ng-bind-template="' + element.html() + '"></style>');
        element.replaceWith(template(scope));
      }
    }
  };
}])



.directive('hideTabs', function($rootScope) {
  return {
      restrict: 'A',
      link: function($scope, $el) {
          $rootScope.hideTabs = 'tabs-item-hide';
          $scope.$on('$destroy', function() {
              $rootScope.hideTabs = '';
          });
      }
  }



})



.filter('range', function(){
  return function(n) {
    var res = [];
    for (var i = 0; i < n; i++) {
      res.push(i);
    }
    return res;
  };
})



.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){
 
  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();    
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){
 
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("went online");
          });
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
          });
 
        }
        else {
 
          window.addEventListener("online", function(e) {
            console.log("went online");
          }, false);    
 
          window.addEventListener("offline", function(e) {
            console.log("went offline");
          }, false);  
        }       
    }
  }
})
