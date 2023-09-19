export const getAllRaces = () => {
    return fetch("http://ergast.com/api/f1/current/races.json")
      .then((response) => response.json())
      .then((data) => data.MRData.RaceTable.Races);
  };

  export const getRaceByRound = (round) => {
    return fetch(`http://ergast.com/api/f1/current/races/${round.round}.json`)
      .then((response) => response.json())
      .then((data) => data.MRData.RaceTable.Races[0]);
  };