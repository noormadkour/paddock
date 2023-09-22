import { useEffect, useState } from "react";
import "./Drivers.css";
import { getTeamByDriverId } from "../../services/driverService";

export const Driver = ({ driverObj }) => {
  const [driversTeam, setDriversTeam] = useState({})

  useEffect(() => {
    driverObj.driverId && getTeamByDriverId(driverObj.driverId).then(teamObj => setDriversTeam(teamObj))
  }, [driverObj])

  return (
    <div className="driver-container" key={driverObj.driverId}>
      <div>
        <h2 className="driver-code">{driverObj.code} - {driverObj.permanentNumber}</h2>
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
  );
};
