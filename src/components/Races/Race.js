import "./Races.css"

export const Race = ({ raceObj }) => {
  return (
    <div className="race-container" key={raceObj.round}>
      <div>
        <h2>
          {raceObj.raceName}
        </h2>
      </div>
      <div>
        <span className="race-info">Circuit: </span>
        <span>{raceObj.Circuit.circuitName}</span>
      </div>
      <div>
        <span className="race-info">Date: </span>
        <span>{raceObj.date}</span>
      </div>
    </div>
  );
};
