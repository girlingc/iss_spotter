const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = function(body) {
  body = JSON.parse(body).ip
  return request(`https://api.freegeoip.app/json/?apikey=${process.env.API_KEY}`)
}

const fetchISSFlyOverTimes = function(body) {
  const lat = JSON.parse(body).latitude;
  const long = JSON.parse(body).longitude;
  const coords = {
    lat: lat,
    long: long
  };
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.long}`)
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation }