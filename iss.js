const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }
    try {
      const dataObj = JSON.parse(data);
      callback(null, dataObj.ip);
    } catch (error) {
      callback(error, null);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let latlong = {};
  const URL = 'https://ipwho.is/' + ip;
  request(URL, (error, response, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }
    
    try {
      const dataObj = JSON.parse(data);
      if (!dataObj.success) {
        const msg = `Success status was ${ dataObj.success }. Server message says: ${ dataObj.message } when fetching for IP ${ dataObj.ip }`;
        callback(Error(msg), null);
        return;
      }
      latlong.latitude = dataObj.latitude;
      latlong.longitude = dataObj.longitude;
      callback(null, latlong);
    } catch (error) {
      callback(error, null);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const URL = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(URL, (error, response, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly overs. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }
    try {
      const dataObj = JSON.parse(data);
      if (dataObj.message !== 'success') {
        const msg = `Success status was ${dataObj.message} when fetching for fly overs`;
        callback(Error(msg), null);
        return;
      }
      callback(null, dataObj.response);
    } catch (error) {
      callback(error, null);
    }
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyTimes) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, flyTimes)
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };