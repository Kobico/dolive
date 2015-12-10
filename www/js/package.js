(function(angular) {
  'use strict';
  angular.module('deliveryApp.package',[])
  .controller('NewpackageCtrl', function($rootScope, $scope, $ionicModal, $timeout, $cordovaCamera, CameraOptions, LocationService, Packages, userSettings) {
    $scope.packageSettings = userSettings.package;
    $scope.options = {
      saveSizeToList: false,
      showDefaults: false,
      customSize: $scope.packageSettings.sizes[0],
      setCustomSize: function(customSize) {
        this.customSize = customSize;
      }
    };

    $scope.package = {
      selectedType: 0,
      from: {
        address: ''
      },
      to: {
        address: ''
      },
      description: '',
      pics: [],
      setType: function(packageType) {
        this.selectedType = packageType;
        if(packageType===2) $scope.sizeSelectorModal.show();
      },
      setTime: function(deliveryTime) {
        this.time = deliveryTime;
      },
      setSize: function(packageSize) {
        this.size = packageSize;
        console.log(packageSize);
      },
      submit: function() {
        var pkg = {
          from: this.from,
          to: this.to,
          size: this.size,
          time: this.time,
          description: this.description,
          pics: this.pics,
        }
        Packages.$add(pkg);
      }
    };
    function setType(packageType) {
        this.selectedType = packageType;
        if(packageType===2) $scope.sizeSelectorModal.show();
    }
    LocationService.getAddress().then(function(street) {
      $scope.package.from.address = street;
    });
    $scope.takePicture = function() {
      $cordovaCamera.getPicture(CameraOptions).then(function(image) {
        if(image) $scope.package.pics.push(image);
        else {
          $scope.package.pics.push('img/dev/'+($scope.package.pics.length+1)+'.jpg');
        }
      }, function(err) {
        return false;
      });
    }
    $ionicModal.fromTemplateUrl('templates/modals/packageSize.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.sizeSelectorModal = modal;
    });
  });

})(angular);