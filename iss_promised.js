const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function (ip) {
  const URL = `https://ipwho.is/${JSON.parse(ip).ip}`;
  return request(URL);
}


const fetchISSFlyOverTimes = function (geoText) {
  const geoData = JSON.parse(geoText);
  const URL = `https://iss-flyover.herokuapp.com/json/?lat=${geoData.latitude}&lon=${geoData.longitude}`;
  //URL = `https://iss-flyover.herokuapp.com/json/?lat=43.653226&lon=-79.3831843`;
  return request(URL);
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((geoText) => fetchISSFlyOverTimes(geoText))
    .then((geoData) => {
      const { response } = JSON.parse(geoData);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };