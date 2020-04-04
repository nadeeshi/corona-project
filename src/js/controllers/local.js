angular
    .module('CovidN')
    .controller('DataCtrl', ['$scope', '$http', DataCtrl]);

function DataCtrl($scope, $http) {
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

    $scope.filterFunctionForHospitals = function() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("hospitalInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("hospitalTable");
      tr = table.getElementsByTagName("tr");

      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }

    };
}
