const { nextISSTimesForMyLocation } = require("./iss_promised")


nextISSTimesForMyLocation()
  .then((flyTimes) => printFlyTimes(flyTimes))
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })

const printFlyTimes = function (data) {
  for (let object of data) {
    const date = new Date(object.risetime * 1000);
    console.log(`Next pass at ${date.toUTCString()} for ${object.duration}seconds!`);
  }
};