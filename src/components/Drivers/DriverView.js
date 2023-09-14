import { useEffect, useState } from "react";
import { getDriverById } from "../../services/driverService";
import { useParams } from "react-router-dom";

export const DriverView = () => {
  const [driver, setDriver] = useState({});
  const { driverId } = useParams();

  useEffect(() => {
    getDriverById(driverId).then((driverObj) => {
      setDriver(driverObj);
    });
  }, [driverId]);

  return (
    <div className="driver-container" key={driver.driverId}>
      <div>
        <div className="driver-info">Name</div>
        <div>
          {driver.givenName} {driver.familyName}
        </div>
      </div>
      <div>
        <div className="driver-info">Driver Code: </div>
        <span>{driver.code}</span>
      </div>
      <div>
        <div className="driver-info">Permanent Number</div>
        <div>{driver.permanentNumber}</div>
      </div>
    </div>
  );
};
