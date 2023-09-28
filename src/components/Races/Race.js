import { useEffect, useState } from "react";
import "./Races.css";
import { getExtraInfoPerRound } from "../../services/raceService";

export const Race = ({ raceObj }) => {
  const [extraInfo, setExtraInfo] = useState({});

  useEffect(() => {
    getExtraInfoPerRound(raceObj.round).then((extraInfo) =>
      setExtraInfo(extraInfo)
    );
  }, [raceObj]);

  return (
    <div className="race-container" key={raceObj.round}>
      <div className="race-image-div">
        <img className="race-mini-map" src={extraInfo?.miniCircuit} alt={extraInfo?.raceName} />
      </div>
      <div className="race-text-div">
        <h2>{raceObj.raceName}</h2>
        <div>{raceObj.Circuit.circuitName}</div>
        <div>{raceObj.date}</div>
      </div>
    </div>
  );
};
