const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(flyover) {
  for (const pass of flyover) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`\nNext pass at ${datetime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

module.exports = { printPassTimes }