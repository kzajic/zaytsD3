## ZaytsD3

Get file from lib folder and generate D3-based charts 
no previous knowledge of D3.js is required

Charts and Graphs added to the library so far:

#Progress Bar

wrap your code and pass value to update function:

    var myChart = new zaytsD3.ProgressBar(".myClass");
    myChart.update(100);

#Donut Chart

wrap your code and pass array with values to update function:

    var myChart = new zaytsD3.DonutChart(".myClass");
    myChart.update([{val: 74}, {val: 12}, {val: 68}, {val: 51}]);

ZaytsD3 is part of my [zayts.com](http://zayts.com/) project