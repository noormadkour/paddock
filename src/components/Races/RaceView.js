import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllRaces, getExtraInfoPerRound } from "../../services/raceService";

export const RaceView = () => {
  //   const [allRaces, setAllRaces] = useState([]);
  const [race, setRace] = useState({});
  const [extraRaceInfo, setExtraRaceInfo] = useState({});
  const { raceRound } = useParams();

  useEffect(() => {
    getAllRaces().then((raceArray) =>
      setRace(
        raceArray.find(
          (raceObj) => parseInt(raceObj.round) === parseInt(raceRound)
        )
      )
    );
    getExtraInfoPerRound(raceRound).then((extraInfoObj) =>
      setExtraRaceInfo(extraInfoObj)
    );
  }, []);

  //   useEffect(() => {
  //     const currentRace = allRaces?.find((raceObj) => parseInt(raceObj.round) === parseInt(raceRound));
  //     setRace(currentRace);
  //   }, [allRaces. raceRound]);

  return (
    <div className="race-detail-container">
      <div className="race-detail-header-div">
        <h2 className="race-detail-header">{race?.raceName}</h2>
        <span className="race-detail-info">(Round {race?.round})</span>
        <span className="race-detail-info">{race?.date}</span>
      </div>
      <div className="race-detail-flex">
        <div className="race-detail-map-div">
          <img
            className="race-detail-map"
            src={extraRaceInfo?.largeCircuit}
            alt={extraRaceInfo.raceName}
          />
        </div>
        <div className="race-detail-stats">
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Circuit: </span>
            <span>{race?.Circuit?.circuitName}</span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">First Practice: </span>
            <span>
              {race?.FirstPractice?.date} -{" "}
              {race?.FirstPractice?.time?.slice(0, -1)}
            </span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Second Practice: </span>
            <span>
              {race?.SecondPractice?.date} -{" "}
              {race?.SecondPractice?.time?.slice(0, -1)}
            </span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Third Practice: </span>
            <span>
              {race?.ThirdPractice?.date} - {(race?.ThirdPractice?.time)?.slice(0, -1)}
            </span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Qualifying: </span>
            <span>
              {race?.Qualifying?.date} - {(race?.Qualifying?.time)?.slice(0, -1)}
            </span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Grand Prix: </span>
            <span>
              {race?.date} - {(race?.time)?.slice(0, -1)}
            </span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Lap Record: </span>
            <span>
              {extraRaceInfo?.fastestLap}
            </span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Lap Distance: </span>
            <span>
              {extraRaceInfo?.lapLength}
            </span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Year Debuted: </span>
            <span>
              {extraRaceInfo?.firstYearRaced}
            </span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Most Recent Winner: </span>
            <span>
              {extraRaceInfo?.lastWinner}
            </span>
          </div>
          <div className="mini-race-flex-div">
            <span className="race-detail-info">Most Wins (Constructor): </span>
            <span>
              {extraRaceInfo?.constructorWithMostWins}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
