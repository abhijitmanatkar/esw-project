// Functions for interfacing with the OneM2M Server
const axios = require("axios");
const Reading = require("./ReadingModel");

const CONTAINER_URL =
  "https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-23/Node-1/Data?rcn=4";
const CREDS = "FYPudLSp3y:82LrMU7aZV";

// Convert yyyymmddThhmmss to js Date
const ctToDate = (s) => {
  let t =
    s.substr(0, 4) +
    "-" +
    s.substr(4, 2) +
    "-" +
    s.substr(6, 2) +
    "T" +
    s.substr(9, 2) +
    ":" +
    s.substr(11, 2) +
    ":" +
    s.substr(13, 2);
  return new Date(t);
};

// Get Readings from OneM2M server
const getAllReadings = async () => {
  const config = {
    headers: {
      "X-M2M-Origin": CREDS,
      Accept: "application/json",
    },
  };
  try {
    const response = await axios.get(CONTAINER_URL, config);
    const readings = response.data["m2m:cnt"]["m2m:cin"].map((cin) => {
      const obj = { timestamp: ctToDate(cin["ct"]), ...JSON.parse(cin["con"]) };
      return obj;
    });
    return readings;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Update DB with new values
const updateDB = async () => {
  const serverReadings = await getAllReadings();
  let lastReading = await Reading.findOne().sort({ timestamp: -1 });
  let latestUpdatedTimestamp = lastReading ? lastReading.timestamp : 0;
  let newReadings = serverReadings.filter(
    (reading) => reading.timestamp > latestUpdatedTimestamp
  );
  Reading.insertMany(newReadings)
    .then(() => {
      console.log("DB Updated");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { updateDB };
