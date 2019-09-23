// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
MAIN = angular.module('MAIN', ['ionic'])
STATS = angular.module('STATS', ['ionic'])

angular.module('starter', ['ionic', 'ionic-material', 'STATS', 'starter.controllers', 'MAIN'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  if( ionic.Platform.isAndroid() )  { 
          admobid = { // for Android
            banner: 'ca-app-pub-6140021411823176/3442585645'
          };
   
          if(AdMob) 
            AdMob.createBanner( 
              {
                adId:admobid.banner, 
                position:AdMob.AD_POSITION.BOTTOM_CENTER, 
                autoShow:true
              } 
            );
      }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'templates/menu.html',
	    controller: 'AppCtrl'
  	})

    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MAIN'
        }
      }
    })

    .state('app.test', {
      url: '/test',
      views: {
        'menuContent': {
          templateUrl: 'templates/TEST.html',
          controller: 'MAIN'
        }
      }
    })

  .state('tab.main-stats', {
      url: '/main-stats/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/main-stats.html',
          controller: 'STATS',
          cache: false,
          params: {
              id: null
          }
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
})

.controller('MAIN', function($scope, $timeout, $http, $state, $window, $ionicLoading,  $ionicHistory, ionicMaterialInk, ionicMaterialMotion) {
  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);

  $scope.home = function() {
    $state.transitionTo('app.main', null, {reload: true, notify:true});
  };
  $scope.curID = $window.localStorage.getItem("currency");
  if ($scope.curID == null ) {
      $window.localStorage.setItem('currency', 'price_usd');
  }
  if ($scope.curID == 'price_usd' ) {
    $scope.sign = "$"
    $scope.currency = {
      dollar:true,
      euro:false,
      pound:false
    }
  }
  if ($scope.curID == 'price_gbp' ) {
    $scope.sign = "£"
    $scope.currency = {
      dollar:false,
      euro:false,
      pound:true
    }
  }
  if ($scope.curID == 'price_eur' ) {
    $scope.sign = "€"
    $scope.currency = {
      dollar:false,
      euro:true,
      pound:false
    }
  }


  $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'

  });

  $scope.convert = function(cur) {

    localStorage["currency"] = null
    $ionicHistory.clearCache()

    $window.localStorage.setItem('currency', cur);
  }
  
  $http.get('https://api.coinmarketcap.com/v1/ticker/').then(function(res){
    $scope.crypto = res.data;  

    $ionicLoading.hide()
  });

  $scope.Gostats = function(id) {
    $window.localStorage.setItem('id', JSON.stringify({'id':id}));
    $state.go('app.main-stats');
  }

$scope.doRefresh = function() {
  $http.get('http://instabreed.com/CryptoTracker/').then(function(res){

    $scope.zcoinprice = res.data['zcoin'][$scope.curID]
    $scope.zcoinday = res.data['zcoin']['percent_change_1h']
    $scope.zcoinhour = res.data['zcoin']['hour_change']


    $scope.bitcoinprice = res.data['bitcoin'][$scope.curID]
    $scope.bitcoinday = res.data['bitcoin']['percent_change_1h']
    $scope.bitcoinhour = res.data['bitcoin']['hour_change']


    $scope.litecoinprice = res.data['litecoin'][$scope.curID]
    $scope.litecoinday = res.data['litecoin']['percent_change_1h']
    $scope.litecoinhour = res.data['litecoin']['hour_change']


    $scope.dashprice = res.data['dash'][$scope.curID]
    $scope.dashday = res.data['dash']['percent_change_1h']
    $scope.dashhour = res.data['dash']['hour_change']


    $scope.ethereumprice = res.data['ethereum'][$scope.curID]
    $scope.ethereumday = res.data['ethereum']['percent_change_1h']
    $scope.ethereumhour = res.data['ethereum']['hour_change']


    $scope.moneroprice = res.data['monero'][$scope.curID]
    $scope.moneroday = res.data['monero']['percent_change_1h']
    $scope.monerohour = res.data['monero']['hour_change']

    $scope.$broadcast('scroll.refreshComplete');


  });
}



})

.controller('STATS', function($scope, $http, $state, $window, $ionicLoading) {

  $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'

  });

  $scope.curID = $window.localStorage.getItem("currency");
  if ($scope.curID == null ) {
      $window.localStorage.setItem('currency', 'price_usd');
  }
  if ($scope.curID == 'price_usd' ) {
    $scope.sign = "$"
    $scope.currency = {
      dollar:true,
      euro:false,
      pound:false
    }
  }
  if ($scope.curID == 'price_gbp' ) {
    $scope.sign = "£"
    $scope.currency = {
      dollar:false,
      euro:false,
      pound:true
    }
  }
  if ($scope.curID == 'price_eur' ) {
    $scope.sign = "€"
    $scope.currency = {
      dollar:false,
      euro:true,
      pound:false
    }
  }

//
//  var saved = JSON.parse($window.localStorage.getItem('id'))
//  id = saved['id']
//  $http.get('http://instabreed.com/CryptoTracker/'+id).then(function(res){
//    $scope.id = res.data[id]['id']
//   $scope.day = res.data[id]['percent_change_1h']
//   $scope.price = res.data[id][$scope.curID]
//    $scope.img = res.data[id]['base64']
//    $scope.hour = res.data[id]['hour_change']
//    $scope.week = res.data[id]['week_change']


//

  //});


});
