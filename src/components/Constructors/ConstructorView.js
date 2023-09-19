import { useParams } from "react-router-dom";
import { getConstructorById } from "../../services/constructorService";
import { useEffect, useState } from "react";

export const ConstructorView = () => {
  const [constructor, setConstructor] = useState({});
  const { constructorId } = useParams();

  useEffect(() => {
    getConstructorById(constructorId).then(constructorObj => setConstructor(constructorObj))
  }, [constructorId])

  return (
    <div className="constructor-container">
      <div>
        <div className="constructor-info">Name</div>
        <div>{constructor.name}</div>
      </div>
      <div>
        <div className="constructor-info">Country of Origin: </div>
        <span>{constructor.nationality}</span>
      </div>
    </div>
  );
};
