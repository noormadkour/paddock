import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllRaces } from "../../services/raceService";

export const RaceView = () => {
//   const [allRaces, setAllRaces] = useState([]);
  const [race, setRace] = useState({});
  const { raceRound } = useParams();


  useEffect(() => {
    getAllRaces().then((raceArray) => 
        setRace(raceArray.find((raceObj) => parseInt(raceObj.round) === parseInt(raceRound)))
  )}, []);

//   useEffect(() => {
//     const currentRace = allRaces?.find((raceObj) => parseInt(raceObj.round) === parseInt(raceRound));
//     setRace(currentRace);
//   }, [allRaces. raceRound]);

  return (
    <div className="race-detail-container">
      <div>
            <span className="race-info">Race Name: </span>
            <span>
              {race?.raceName}
            </span>
          </div>
          <div>
            <span className="race-info">Round: </span>
            <span>{race?.round}</span>
          </div>
          <div>
            <span className="race-info">Circuit: </span>
            <span>{race?.Circuit?.circuitName}</span>
          </div>
          <div>
            <span className="race-info">Date: </span>
            <span>{race?.date}</span>
          </div>
          <div>
            <span className="race-info">First Practice: </span>
            <span>{race?.FirstPractice?.date} - {race?.FirstPractice?.time}</span>
          </div>
          <div>
            <span className="race-info">Second Practice: </span>
            <span>{race?.SecondPractice?.date} - {race?.SecondPractice?.time}</span>
          </div>
          <div>
            <span className="race-info">Third Practice: </span>
            <span>{race?.ThirdPractice?.date} - {race?.ThirdPractice?.time}</span>
          </div>
          <div>
            <span className="race-info">Qualifying: </span>
            <span>{race?.Qualifying?.date} - {race?.Qualifying?.time}</span>
          </div>
    </div>
  );
};
