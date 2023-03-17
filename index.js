const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  let ipAddress = ip.ip;
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ipAddress)

  console.log("=========================================================")

  fetchCoordsByIP(ipAddress, (err, data) => {
  let coordinates = {"latitude": data.latitude, "longitude": data.longitude}
  if (err) {
    console.log(err);
  }
  console.log({"Latitude" : coordinates.latitude, "Longitude" : coordinates.longitude});

  console.log("=========================================================")

  fetchISSFlyOverTimes(coordinates, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data.response);
  })
})
})

