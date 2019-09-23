angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicPopup, $window) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  $scope.back = function() {
    window.history.back();
  }



  $scope.home = function() {
    window.history.back()
  };


  $scope.data = {};

  // An elaborate, custom popup
  $scope.showMissing = function() {
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.currency">',
    title: 'Enter currency name your would like to follow.',
    subTitle: 'It wil be reviewed.',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>submit</b>',
        type: 'button-dark',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });
}
})

.controller('currency_modal', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('currency_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

});