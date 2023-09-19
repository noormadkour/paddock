import "./Races.css"

export const Race = ({ raceObj }) => {
  return (
    <div className="race-container" key={raceObj.round}>
      <div>
        <div className="race-info">Race Name: </div>
        <div>
          {raceObj.raceName}
        </div>
      </div>
      <div>
        <div className="race-info">Circuit: </div>
        <span>{raceObj.Circuit.circuitName}</span>
      </div>
      <div>
        <div className="race-info">Date: </div>
        <div>{raceObj.date}</div>
      </div>
    </div>
  );
};
