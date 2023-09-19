import { useEffect, useState } from "react";
import { getAllRaces } from "../../services/raceService";
import { Link } from "react-router-dom";
import { Race } from "./Race";

export const RacesList = () => {
  const [allRaces, setAllRaces] = useState([]);

  useEffect(() => {
    getAllRaces().then((racesArray) => setAllRaces(racesArray));
  }, []);

  return (
    <div className="races-container">
      {allRaces.map((raceObj) => {
        return (
          <Link key={raceObj.round} to={`/races/${raceObj.round}`}>
            <Race raceObj={raceObj} />
          </Link>
        );
      })}
    </div>
  );
};
