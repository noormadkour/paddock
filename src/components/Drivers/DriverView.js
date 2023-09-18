import { useEffect, useState } from "react";
import { getDriverById } from "../../services/driverService";
import { useParams } from "react-router-dom";
import { getCommentByDriver } from "../../services/commentService";


export const DriverView = () => {
  const [driver, setDriver] = useState({});
  const [driverComments, setDriverComments] = useState([]);
  const { driverId } = useParams();

  useEffect(() => {
    getDriverById(driverId).then((driverObj) => {
      setDriver(driverObj);
    });
    getCommentByDriver(driverId).then((driverCommentsArray) => {
      setDriverComments(driverCommentsArray);
    });
  }, [driverId]);


  return (<>
    <div className="driver-detail-container" key={driver.driverId}>
      <div>
        <div className="driver-detail-info">Name</div>
        <div>
          {driver.givenName} {driver.familyName}
        </div>
      </div>
      <div>
        <div className="driver-detail-info">Driver Code: </div>
        <span>{driver.code}</span>
      </div>
      <div>
        <div className="driver-detail-info">Permanent Number</div>
        <div>{driver.permanentNumber}</div>
      </div>
    </div>
      <div className="driver-comments-container">
        <div className="driver-comments-header">Comments: </div>
        {driverComments ? (driverComments.map(comment => {
          return <div className="driver-comment" key={comment.commentId}>{comment.commentContent}</div>
        })) : "No comments on this driver"}
      </div>
      </>
  );
};
