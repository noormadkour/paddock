import { useEffect, useState } from "react";
import { getAllConstructors } from "../../services/constructorService";
import "./Constructors.css";
import { Link } from "react-router-dom";
import { Constructor } from "./Constructor";

export const ConstructorList = () => {
  const [allConstructors, setAllConstructors] = useState([]);

  useEffect(() => {
    getAllConstructors().then((constructorArray) =>
      setAllConstructors(constructorArray)
    );
  }, []);

  return (
    <div className="constructors-container">
      {allConstructors.map((constructorObj) => {
        return (
          <Link
            key={constructorObj.constructorId}
            to={`/constructors/${constructorObj.constructorId}`}
          >
            <Constructor constructorObj={constructorObj} />
          </Link>
        );
      })}
    </div>
  );
};
