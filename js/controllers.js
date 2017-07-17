 var Controllers = angular.module('Controllers', ['ui.bootstrap', 'ngAnimate']);

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
//轮播动画
Controllers.controller('CarouselDemoCtrl',['$scope','DishList',function ($scope,DishList) {
       $scope.myInterval = 2000;
       $scope.noWrapSlides = false;
       var _init = function (){
         DishList.getInfo(function () {
             $scope.dish = function (){
               var newWidth = 600 + slides.length + 1;
                 // 添加轮播图源
                slides.push({image: 'tpl/Img/11-1.jpg', text: '亲爱的你，情人节快乐' });
                slides.push();
                slides.push();
                slides.push();
                $scope.addDish();
             }
        })
      };
          _init();
}]);
// Controllers.controller('Pcontroller',['$scope','DishList',
//     function ($scope,Dishlist) {
//         // 设置轮播图图片间隔
//          $scope.myInterval = 5000;
//          // 轮播图数据初始化
//          var slides = $scope.slides = [];
//          // 添加轮播图源
//          slides.push({image: 'tpl/Img/11-1.jpg', text: '亲爱的你，情人节快乐' });
//          slides.push({image: 'tpl/Img/11-1.jpg', text: '亲爱的你，情人节快乐' });
//
//
//  }]);