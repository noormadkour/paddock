import { useParams } from "react-router-dom";
import {
  getConstructorById,
  getExtraTeamInfoById,
} from "../../services/constructorService";
import { useEffect, useState } from "react";

export const ConstructorView = () => {
  const [constructor, setConstructor] = useState({});
  const [extraInfo, setExtraInfo] = useState({});
  const { constructorId } = useParams();

  useEffect(() => {
    getConstructorById(constructorId).then((constructorObj) =>
      setConstructor(constructorObj)
    );
    getExtraTeamInfoById(constructorId).then((constructorObj) =>
      setExtraInfo(constructorObj)
    );
  }, [constructorId]);

  return (
    <div className="constructor-detail-container">
      <div className="constructor-detail-flex">
        <img
          className="constructor-detail-logo"
          src={extraInfo?.largeLogoUrl}
          alt={constructor?.name}
        />
        <div className="constructor-detail-data">
          <div className="mini-constructor-flex">
            <span className="constructor-detail-info">Name</span>
            <span>{constructor?.name}</span>
          </div>
          <div className="mini-constructor-flex">
            <span className="constructor-detail-info">Debut Year: </span>
            <span>{extraInfo?.firstYearEntered}</span>
          </div>
          <div className="mini-constructor-flex">
            <span className="constructor-detail-info">Team Base: </span>
            <span>{extraInfo?.teamBase}</span>
          </div>
          <div className="mini-constructor-flex">
            <span className="constructor-detail-info">Team Principal: </span>
            <span>{extraInfo?.teamPrincipal}</span>
          </div>
          <div className="mini-constructor-flex">
            <span className="constructor-detail-info">Website: </span>
            <a href={extraInfo?.teamWebsite}>{extraInfo?.teamWebsite}</a>
          </div>
          <div className="mini-constructor-flex">
            <span className="constructor-detail-info">Current Drivers: </span>
            <div>{extraInfo?.drivers}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
