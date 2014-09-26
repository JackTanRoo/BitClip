var express = require('express');
var path = require('path');
var cors = require('cors');
var http = require('http');

var dbRequest = require('./db/dbRequestHandler.js');

var app = express();

var testData = { transactions:
	[{
        "key": "Github Api Mean Web Response Time",
        "values": [[1378387200.0, 123.08370666666667], [1378387500.0, 119.64371999999999], [1378387800.0, 126.92131333333332], [1378388100.0, 122.06958666666667], [1378388400.0, 126.50453], [1378388700.0, 168.14301666666668], [1378389000.0, 132.83243], [1378389300.0, 137.11919333333336], [1378389600.0, 152.85155], [1378389900.0, 133.26816], [1378390200.0, 178.5094466666667], [1378390500.0, 156.0947666666667]]
    }]
};


app.use(cors());

// This initializes the connections to our APIs' web sockets
dbRequest.initializeSockets();

// This initializes the GET requests we will be using
// to fetch data from APIs without web sockets
dbRequest.initializeGetRequests();

// This specifies the interval for which we will aggregate
// our API market data tables into our aggregated market
// data table
setInterval(function() {
  dbRequest.aggregateTables();
}, 1000);

// Sending a GET request to /api/marketdata will return
// an answer from our aggregated market data table,
// based on user-specified parameters
// http.get('http://127.0.0.1:8080/api/marketdata', function() {
//  console.log("I called stuff");
//  //Will prolly have to change this to post to send the object.
// });
app.get('/api/marketdata', function(req, res) {
  // dbRequest.deliverMarketData(req
  //   // {
  //   // "timePeriod": 28800000, // this is 8 hours in milliseconds
  //   // "time": 1411700196372 // equivalent to Wed Sep 24 2014 16:28:32 GMT-0700 (PDT)
  //   // }
  //   ).then(function(data) {
  //   res.status(200).send(data);
  res.end(JSON.stringify(testData))
  });
});

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log("Listening on: ", port);
});