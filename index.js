const {  nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//     return;
//   }
//   console.log("It worked! ", ip);
// });

// fetchCoordsByIP('142.126.163.10', (error, coords) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//     return;
//   }
//   console.log("It worked! ", coords);
// });

// fetchISSFlyOverTimes({ latitude: 43.653226, longitude: -79.3831843 }, (error, flyOvers) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//     return;
//   }
//   for (let object of flyOvers) {
//     const date = new Date(object.risetime * 1000);
//     console.log(`Next pass at ${date.toUTCString()} for ${object.duration}seconds!`);
//   }
// });

nextISSTimesForMyLocation ((error, flyOvers) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }
  for (let object of flyOvers) {
    const date = new Date(object.risetime * 1000);
    console.log(`Next pass at ${date.toUTCString()} for ${object.duration}seconds!`);
  }
});