angular.module("CovidN").controller("DataCtrl", ["$scope", "$http", function($scope, $http) {
   $http({
        method : "GET",
        url : 'https://hpb.health.gov.lk/api/get-current-statistical'
    }).then(function mySuccess(response) {
        var data = response.data.data;

        $scope.coronaDataObj = {
            localTotalCases: data.local_total_cases,
            localNewCases: data.local_new_cases,
            localDeaths: data.local_deaths,
            localRecovered: data.local_recovered,
            hospitalDataList: data.hospital_data,
            globalNewCases: data.global_new_cases,
            globalTotalCases: data.global_total_cases,
            globalDeaths: data.global_deaths,
            globalRecovered: data.global_recovered
        };
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
  });

}]);
