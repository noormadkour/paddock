import { useState, useEffect } from "react";
import "./Constructors.css"
import { getExtraTeamInfoById } from "../../services/constructorService";

export const Constructor = ({ constructorObj }) => {
  const [ extraInfo, setExtraInfo] = useState({})

  useEffect(() => {
    constructorObj.constructorId && getExtraTeamInfoById(constructorObj.constructorId).then((constructorObj) => 
    setExtraInfo(constructorObj)
  );
  }, [constructorObj])

  
    return (
        <div className="constructor-container" key={constructorObj.constructorId}>
          <div className="constructor-card-text">
            <h2>{constructorObj.name}</h2>
            <div className="constructor-info">Team Origin: </div>
            <span>{constructorObj.nationality}</span>
          </div>
          <div className="constructor-logo-div">
            <img className="constructor-logo" src={extraInfo?.logoUrl} alt={constructorObj.constructorId} />
          </div>
        </div>
      );
}