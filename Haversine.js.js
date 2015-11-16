// var haversine = require('haversine');
// 
// start = {
//   latitude: 30.849635,
//   longitude: -83.24559
// };
// end = {
//   latitude: 27.950575,
//   longitude: -82.457178
// };
// 
// console.log(haversine(start, end));
// console.log(haversine(start, end, { unit: 'km' }))
// console.log(haversine(start, end, { threshold: 1 }))
// console.log(haversine(start, end, { threshold: 1, unit: 'km' }))
Number.prototype.toRadians = function() {
   return this * Math.PI / 180;
}

Number.prototype.toDegrees = function() {
   return this * 180/Math.PI;
}

  var R = 6371000;

function HaversineDistance(start, end)
{
  var phi1 = start.latitude.toRadians();
  var phi2 = end.latitude.toRadians();
  var delPhi = (end.latitude - start.latitude).toRadians();
  var delLambda = (end.longitude - start.longitude).toRadians();
  var a = Math.sin(delPhi / 2) * Math.sin(delPhi/2) + Math.cos(phi1)*Math.cos(phi2)*Math.sin(delLambda/2)*Math.sin(delLambda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));  
  return R * c;
};

function InitBearing(start, end)
{
  var y = Math.sin(end.longitude.toRadians() - start.longitude.toRadians()) * Math.cos(end.latitude.toRadians());
  var x = Math.cos(start.latitude.toRadians()) * Math.sin(end.latitude.toRadians()) - Math.sin(start.latitude.toRadians()) * Math.cos(end.latitude.toRadians())* Math.cos(end.longitude.toRadians() - start.longitude.toRadians());
  
  return Math.atan2(y,x).toDegrees();
}

function FinalBearing(start, end)
{
  return (InitBearing(end, start) + 180) %360;
}

function IntermediatePoint(start, end, fraction)
{
  var distance = HaversineDistance(start, end);
  var a = Math.sin((1-fraction) * distance/R) / Math.sin(distance/R);
  var b = Math.sin(fraction - (distance/R))/Math.sin(distance/R);
  var x = (a * Math.cos(start.latitude.toRadians()) * Math.cos(start.longitude.toRadians())) + (b * Math.cos(end.latitude.toRadians()) * Math.cos(end.longitude.toRadians()));
  var y = (a * Math.cos(start.latitude.toRadians()) * Math.sin(start.longitude.toRadians())) + (b * Math.cos(end.latitude.toRadians()) * Math.sin(end.longitude.toRadians()));
  var z = (a* Math.sin(start.latitude.toRadians())) + (b * Math.sin(end.latitude.toRadians()));
  var lat = Math.atan2(z, Math.sqrt((x*x) + (y*y)));
  var long = Math.atan2(y,x);
  var coordinates = {latitude: lat.toDegrees(), longitude: long.toDegrees()}
  return coordinates
}

function DeviationFromNorth(x,y,z, currentDeclination)
{
  
  if(y > 0)
  {
    return ((90 - Math.atan(x/y).toDegrees()) + currentDeclination);
  }
  else if(y < 0)
  {
   return (270 - Math.atan(x/y).toDegrees() + + currentDeclination); 
  }
  else
  {
    if(x < 0)
    {
      return (180 + currentDeclination);
    }
    else
    {
      return (0 + currentDeclination);
    }
  }
}

var a = {latitude:30.849635, longitude: -83.24559 };
var b = {latitude: 27.950575,longitude: -82.457178 };
var x = 16;
var y = -84;
var z = -84;
var decline = -0.718

console.log("distance = " + HaversineDistance(a, b));
console.log("Bearing = " + (InitBearing(a,b) + 360) % 360);
console.log(DeviationFromNorth(x,y,z,decline));
//console.log("turn angle = " + (InitBearing(a,b) - DeviationFromNorth(x,y,z,decline)));
//console.log(IntermediatePoint(a,b,0));