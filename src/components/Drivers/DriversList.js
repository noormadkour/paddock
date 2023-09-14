import { useEffect, useState } from "react";
import { getAllDrivers } from "../../services/driverService";
import "./Drivers.css";
import { Link } from "react-router-dom";
import { Driver } from "./Driver";

export const DriversList = () => {
  const [allDrivers, setAllDrivers] = useState([]);

  useEffect(() => {
    getAllDrivers().then((driversArray) => setAllDrivers(driversArray));
  }, []);

  return (
    <div className="drivers-container">
      {allDrivers.map((driverObj) => {
        return (
          <Link key={driverObj.driverId} to={`/drivers/${driverObj.driverId}`} >
            <Driver driverObj={driverObj} />
          </Link>
        );
      })}
    </div>
  );
};

