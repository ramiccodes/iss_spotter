const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

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
    let times = data.response
    if (err) {
      console.log(err);
    }
    console.log(times);

    console.log("=========================================================")

    nextISSTimesForMyLocation((err)=> {
      if (err) {
        return console.log(err);
      }
      for (const time of times) {
        const datetime = new Date(0);
        datetime.setUTCSeconds(time.risetime);
        const duration = time.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);
      }
    })
  })
})
})



