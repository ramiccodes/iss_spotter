const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://geo.ipify.org/api/v2/country,city?apiKey=at_6NsY5uiHn6muCVKw3rfP3ePOz4j6Y');
}

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip
  return request(`http://ipwho.is/${ip}`)
}

const fetchISSFlyOverTimes = (body) => {
  const coordinates = JSON.parse(body)
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`)
}

const nextISSTimesForMyLocation = (body) => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
}

module.exports = { nextISSTimesForMyLocation };