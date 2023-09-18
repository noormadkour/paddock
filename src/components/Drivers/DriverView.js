import { useEffect, useState } from "react";
import { getDriverById } from "../../services/driverService";
import { useParams } from "react-router-dom";
import { deleteComment, getCommentByDriver } from "../../services/commentService";

export const DriverView = ({ currentUser }) => {
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

  const handleDeleteComment = (comment) => {
    deleteComment(comment)
  }

  return (
    <>
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
        {driverComments.map((comment) => {
          return (
            <div className="driver-comment" key={comment.commentId}>
              {comment.commentContent}{" "}
              {currentUser.id === comment.userId ? (
                <button >Edit</button>
              ) : (
                ""
              )}
              {currentUser.id === comment.userId ? (
                <button onClick={() => handleDeleteComment(comment)}>Delete</button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
