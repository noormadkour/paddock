export const getAllDrivers = () => {
  return fetch("http://ergast.com/api/f1/current/drivers.json")
    .then((response) => response.json())
    .then((data) => data.MRData.DriverTable.Drivers);
};

export const getDriverById = (driverId) => {
  return fetch(`http://ergast.com/api/f1/current/drivers/${driverId}.json`)
    .then((response) => response.json())
    .then((data) => data.MRData.DriverTable.Drivers[0]);
};
