## ZaytsD3

library to generate D3-based charts (part of [zayts.com](http://zayts.com/) project)

Charts and Graphs created so far:

-Progress Bar

wrap your code and pass value to update function:

    var myChart = new zaytsD3.ProgressBar(".myClass");
    myChart.update(100);

-Donut Chart

wrap your code and pass array with values to update function:

    var myChart = new zaytsD3.DonutChart(".myClass");
    myChart.update([{val: 74}, {val: 12}, {val: 68}, {val: 51}]);