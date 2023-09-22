import "./Constructors.css"

export const Constructor = ({ constructorObj }) => {
    return (
        <div className="constructor-container" key={constructorObj.constructorId}>
          <div>
            <h2>{constructorObj.name}</h2>
          </div>
          <div>
            <div className="constructor-info">Country of Origin: </div>
            <span>{constructorObj.nationality}</span>
          </div>
        </div>
      );
}