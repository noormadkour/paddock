import { useEffect, useState } from "react";
import "./Drivers.css";
import {
  getDriverImageById,
  getTeamByDriverId,
} from "../../services/driverService";

export const Driver = ({ driverObj }) => {
  const [driversTeam, setDriversTeam] = useState({});
  const [localDriverObj, setLocalDriverObj] = useState({});

  useEffect(() => {
    driverObj.driverId &&
      getTeamByDriverId(driverObj.driverId).then((teamObj) =>
        setDriversTeam(teamObj)
      );
    driverObj.driverId &&
      getDriverImageById(driverObj).then((localDriverObj) =>
        setLocalDriverObj(localDriverObj)
      );
  }, [driverObj]);

  return (
    <div className="driver-container" key={driverObj.driverId}>
      <div className="driver-text">
        <div>
          <h2 className="driver-code">
            {driverObj.code} - {driverObj.permanentNumber}
          </h2>
        </div>
        <div>
          <div>
            {driverObj.givenName} {driverObj.familyName}
          </div>
        </div>
        <div>
          <div className="driver-team">{driversTeam?.name}</div>
        </div>
      </div>
      <div >
        <img className="driver-image" src={localDriverObj?.imageUrl} alt={driverObj.driverId}/>
      </div>
    </div>
  );
};
