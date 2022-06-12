app.controller('appsController', function($scope, $http, $uibModal, $interval){
    $scope.appCollection = []

    $scope.refresh = function(){
        $http.get("/system/apps")
        .then(function (response) {
            $scope.appCollection = response.data;
        });
    }

    $scope.stop_app = function(app){
        $http.get("/system/apps/stop?name="+app[0])
        .then(function(response){
            console.log(response);
        });
    }

    $scope.start_app = function(app){
        $http.get("/system/apps/start?name="+app[0])
        .then(function(response){
            console.log(response);
        });
    }

    $scope.refresh();
    $interval(function () { $scope.refresh(); }, 3000);
});