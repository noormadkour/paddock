import "./Drivers.css";

export const Driver = ({ driverObj, key }) => {

  return (
    <div className="driver-container" key={driverObj.driverId}>
      <div>
        <div className="driver-info">Name</div>
        <div>
          {driverObj.givenName} {driverObj.familyName}
        </div>
      </div>
      <div>
        <div className="driver-info">Driver Code: </div>
        <span>{driverObj.code}</span>
      </div>
      <div>
        <div className="driver-info">Permanent Number</div>
        <div>{driverObj.permanentNumber}</div>
      </div>
    </div>
  );
};
