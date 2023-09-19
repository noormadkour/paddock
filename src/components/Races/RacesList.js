import { useEffect, useState } from "react";
import { getAllRaces } from "../../services/raceService";
import { Link, useNavigate } from "react-router-dom";
import { Race } from "./Race";

export const RacesList = () => {
  const [allRaces, setAllRaces] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getAllRaces().then((racesArray) => setAllRaces(racesArray));
  }, []);

  return (
    <div className="races-container">
      {allRaces.map((raceObj) => {
        return (
          <Link key={raceObj.round} to={`/races/${raceObj.round}`}>
            <Race raceObj={raceObj} key={raceObj.round}/>
          </Link>
        );
      })}
    </div>
  );
};
