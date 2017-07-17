/**
 * Created by bjwsl-001 on 2017/6/9.
 */

var app = angular.module('fss', ['ng', 'ngRoute', 'Controllers', 'Services']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/fssMain', {
      templateUrl: 'tpl/main.html',
      controller:'MainCtrl'
    })
    .when('/fssDetail/:id', {
      templateUrl: 'tpl/detail.html',
      controller:'DetailCtrl'

    })

    .when('/fssMyOrder', {
      templateUrl: 'tpl/myOrder.html',

    })
      .when('/select',{
        templateUrl:'tpl/select.html'
      })
    .otherwise({redirectTo: '/fssMain'})
})
