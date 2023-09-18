import "./Constructors.css"

export const Constructor = ({ constructorObj }) => {
    return (
        <div className="constructor-container" key={constructorObj.constructorId}>
          <div>
            <div className="constructor-info">Name</div>
            <div>{constructorObj.name}</div>
          </div>
          <div>
            <div className="constructor-info">Country of Origin: </div>
            <span>{constructorObj.nationality}</span>
          </div>
        </div>
      );
}