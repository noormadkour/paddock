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
    <div className="race-container">
      <div>
            <div className="race-info">Race Name: </div>
            <div>
              {race?.raceName}
            </div>
          </div>
          <div>
            <div className="race-info">Circuit: </div>
            <span>{race?.Circuit?.circuitName}</span>
          </div>
          <div>
            <div className="race-info">Date: </div>
            <div>{race?.date}</div>
          </div>
    </div>
  );
};
