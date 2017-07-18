 var Controllers = angular.module('Controllers', []);

Controllers.controller('parentCtrl', ['$scope', '$location',
    function ($scope, $location) {
      $scope.jump = function (desPath) {
        $location.path(desPath);
      }
    }
  ]);
//下拉框
  Controllers.controller('choose1', function($scope) {
      $scope.names = ["商品房", "别墅", "其他"];
  });
  Controllers.controller('choose2', function($scope) {
      $scope.mm = ["精装", "简装", "豪华"];
  });
  Controllers.controller('choose3', function($scope) {
      $scope.gg = [2016];
  });
//主页中的controller
Controllers.controller('MainCtrl', ['$scope', 'DishList', function($scope, DishList) {
    // 初始化方法
    var _init = function () {
      // 获取房源列表
      DishList.getInfo(function (result) {
        $scope.dishList = result;
      });

    }
    _init();
}]);


//详细页面的controller
Controllers.controller('DetailCtrl',['$scope','DishList','$routeParams',function ($scope,DishList, $routeParams) {
  var _init = function () {
    DishList.getDetailInfo($routeParams.id, function (result) {
      $scope.dish = result;
        })
    }
  _init();
}]);
