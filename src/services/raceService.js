export const getAllRaces = () => {
    return fetch("http://ergast.com/api/f1/current/races.json")
      .then((response) => response.json())
      .then((data) => data.MRData.RaceTable.Races);
  };