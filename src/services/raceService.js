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

export const getExtraInfoPerRound = (round) => {
  return fetch(`http://localhost:8088/circuits?round=${round}`)
    .then((response) => response.json())
    .then((data) => data[0]);
};
