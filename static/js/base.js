var app = angular.module('unicom_server', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','ui.bootstrap.contextMenu',"smart-table"]);

app.controller('nav', ['$scope', '$http',function ($scope, $http){
    $scope.connect = function(){
        var dataToPost = {"login": $scope.login, "password": $scope.password};
        console.log(dataToPost);
        $http({
            method: 'POST',
            url: '/system/authenticate',
            data: dataToPost }).then(function (response) {
                location.reload(true);
            });
    }
    $scope.disconnect = function(){
        var dataToPost = {"login": "", "password": ""};
        $http({
            method: 'POST',
            url: '/system/authenticate',
            data: dataToPost }).then(function (response) {
                location.reload(true);
            });
    }
}]);

getSelection = function(collection){
    var ret = [];
    var i;
    for (i = 0; i < collection.length; i++) {
        if (collection[i].isSelected){
            ret.push(collection[i])
        }
    }
    return ret;
}

setSelection = function(collection){
    var ret = [];
    var i;
    for (i = 0; i < collection.length; i++) {
        collection[i].isSelected = True;
    }
    return ret;
}

app.directive("bytes", function(){
    return {
        restrict: 'E',
        template: '{{convertBytes(size)+add}}',
        scope: {
            size: '=',
            add: '='
          },
        controller: function($scope, $element) {
            $scope.convertBytes = function(value){
                if (value == 0){
                    return "0.0 KB"
                }
                var size_name = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
                var pre = Math.log(value)/Math.log(1024)
                var i = Math.floor(pre)
                if (i == 0){
                    i = 1;
                }
                var p = Math.pow(1024, i)
                var s = (value/p).toFixed(1)
                return s+" "+size_name[i]
            }
        },
      }
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
})