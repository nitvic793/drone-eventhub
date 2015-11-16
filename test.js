var Haversine = require("./Haversine");
var Convert = require("./Conversion");

var a = {latitude:30.849635, longitude: -83.24559 };
var b = {latitude: 27.950575,longitude: -82.457178 };
var x = 16;
var y = -84;
var z = -84;
var decline = -0.718
console.log(Haversine);
console.log("distance = " + Haversine.HaversineDistance(a, b));
console.log("Bearing = " + (Haversine.InitBearing(a,b) + 360) % 360);
console.log(Haversine.DeviationFromNorth(x,y,z,decline));


console.log(Convert.ToSpeedTime(Haversine.HaversineDistance(a,b)));
console.log(Convert.ToRotationData(Haversine.DeviationFromNorth(x,y,z,decline)));