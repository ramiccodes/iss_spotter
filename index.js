const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  let ipAddress = ip.ip;
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ipAddress)

  console.log("=========================================================")
  fetchCoordsByIP(ipAddress, (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log("Latitude: " + data.latitude, "Longitude: " + data.longitude);
})
})

