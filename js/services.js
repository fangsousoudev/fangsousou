var Services = angular.module('Services', []);

// 房源列表
Services.service('DishList', ['$http', function($http) {
    // 获取数据
    this.getInfo = function (callback) {
      $http({
            method: 'GET',
            url: './data/dish_getbypage.php',
            data: 'null',
            headers: {
                'Content-Type': 'application/json'
                     }
           })
        .success(function(data) {
            callback(data.data);
          });
          // if (data.status == 1) {
          //   callback(data.data);
        };

    //获取详细数据
    this.getDetailInfo = function (id, callback) {
       $http({
         method: 'GET',
         url: './data/dish_getDetail.php?id=' + id,
         data: 'null',
         headers: {
             'Content-Type': 'application/json'
                  }
        })
        .success(function(data) {
            callback(data.data);
          });
        // array = {name: '张三', age:18};
        // callback(array)
       };
}]);
