angular.module("CovidN").controller("GraphCtrlForSelectedCountry", ["$scope", "$http", function($scope, $http) {
    $http({
        method : "GET",
        url : 'https://pomber.github.io/covid19/timeseries.json'
    }).then(function mySuccess(data) {
        $scope.countryData = data.data;
        $scope.selectedValue = Object.keys($scope.countryData)[0];
        $scope.countryNames =  Object.keys($scope.countryData);

        $scope.countryDataTable = [];
        for (var i = 0; i < $scope.countryNames.length; i++) {
          var getSelectedContryData = $scope.countryData[$scope.countryNames[i]];
           
          var last = getSelectedContryData[getSelectedContryData.length-1];

          var countryyy = {
            countryName: $scope.countryNames[i],
            totalConfirmed: last.confirmed,
            totalDeaths: last.deaths,
            totalRecovered: last.recovered,
            lastUpdateDate: last.date
          };

          $scope.countryDataTable.push(countryyy);
            
         }

        getDataForDrawGraph($scope.countryData[$scope.selectedValue]);
    });


   // functions assigned to onchange properties
    document.getElementById('ddlViewBy').onchange = function() {
      var e = document.getElementById("ddlViewBy");
      var selectedContryName = e.options[e.selectedIndex].value;

      getDataForDrawGraph($scope.countryData[selectedContryName]);
    }

    $scope.filterFunctionForContry = function() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("contryInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("globalTable");
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
}]);

angular.module("CovidN").controller("GraphCtrl", ["$scope", "$http", function($scope, $http) {
   $http({
        method : "GET",
        url : 'https://pomber.github.io/covid19/timeseries.json'
    }).then(function mySuccess(data) {
        var countryData = data.data;

        getDataForDrawGraph(countryData["Sri Lanka"]);

    }, function myError(data) {
        e.myWelcome = data.statusText;
  });
}]);


function getDataForDrawGraph(DataForSelectedCountry){
  var proData = [];
  var proRecoveredData = [];
  var secondPatientDate = Date.parse("2020-03-07");
  var previousDay = [];

  DataForSelectedCountry.forEach(function(day){ 
    //to fix a glitch in the data API. Don't know what went rong
    if (previousDay["recovered"] >= day["recovered"]) {
      recovered = previousDay["recovered"];
    } else {
      recovered = day["recovered"];
    }

    //temporary variable
    d2 = Date.parse(day["date"]);
    if (d2 > secondPatientDate) {
      proData.push({
        x: day["date"],
        y: day["confirmed"]
      });
    }
    previousDay = day;
  });

  drawChart(proData, "total-cases-graph");
}

//generatess a timeseries graoh using a public dataset
function drawChart(processedData, ctxID) {
  if(window.myLine != null){
     window.myLine.destroy();
  }

  var timeFormat = "YYYY-MM-DD";
  //canvas
  var canvas = document.getElementById(ctxID);
  canvas.width  = 800;
  canvas.height = 625;

  var ctx = canvas.getContext("2d");

  //gradient
  var gradientFill = ctx.createLinearGradient(0, 0, 0, 350);
  gradientFill.addColorStop(0, "rgba(196, 0, 0, 1)");
  gradientFill.addColorStop(0.1, "rgba(90, 0, 0, 1)");
  gradientFill.addColorStop(1, "rgba(0, 0, 0, 0.6)");

  var config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Total Cases",
          data: processedData,
          fill: true,
          backgroundColor: gradientFill,
          borderColor: "#ff3232",
          pointBorderColor: "#ff0000",
          pointBackgroundColor: "#ff0000",
          pointHoverBackgroundColor: "#ff0000",
          pointHoverBorderColor: "#ff0000",
          pointHoverRadius: 2,
          pointHoverBorderWidth: 1
        }
      ]
    },
    options: {
      legend: {
        position: "bottom"
      },
      elements: {
        line: {
          tension: 0
        }
      },
      responsive: true,
      title: {
        display: false
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              format: timeFormat,
              tooltipFormat: "ll"
            },
            scaleLabel: {
              display: true,
              labelString: "Date"
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "value"
            }
          }
        ]
      }
    }
  };

  window.myLine = new Chart(ctx, config);
} //end function