/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');
let data;
const fetchMyIP = function(callback) { 
  request('https://geo.ipify.org/api/v2/country,city?apiKey=at_6NsY5uiHn6muCVKw3rfP3ePOz4j6Y', (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    data = JSON.parse(body);
    callback(err, data);
  })
}

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    const parsed = JSON.parse(body);

    if (!parsed.success) {
      const msg = `Success status was ${parsed.success}. Server message says: ${parsed.message} when fetching for IP ${parsed.ip}`;
      callback(Error(msg), null);
      return;
    }

    ip = JSON.parse(body);
    callback(err, ip)
  })
}

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    coords = JSON.parse(body);
    callback(err, coords);
  });

};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};