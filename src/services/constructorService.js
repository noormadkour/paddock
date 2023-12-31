export const getAllConstructors = () => {
    return fetch("http://ergast.com/api/f1/current/constructors.json")
      .then((response) => response.json())
      .then((data) => data.MRData.ConstructorTable.Constructors);
  };
  
  export const getConstructorById = (constructorId) => {
    return fetch(`http://ergast.com/api/f1/current/constructors/${constructorId}.json`)
      .then((response) => response.json())
      .then((data) => data.MRData.ConstructorTable.Constructors[0]);
  };

  export const getExtraTeamInfoById = (constructorId) => {
    return fetch(`http://localhost:8088/constructorsExtraInfo?constructorId=${constructorId}`)
    .then((response) => response.json()).then(data => data[0])
  }