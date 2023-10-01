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

export const getTeamByDriverId = (driverId) => {
  return fetch(
    `http://ergast.com/api/f1/current/drivers/${driverId}/constructors.json`
  )
    .then((res) => res.json())
    .then((data) => data.MRData.ConstructorTable.Constructors[0]);
};

export const getDriverImageById = (driverId) => {
  return fetch(`http://localhost:8088/driversExtraInfo?foreignDriverId=${driverId}`)
  .then((response) => response.json())
  .then((driverObj) => driverObj[0])
} 
