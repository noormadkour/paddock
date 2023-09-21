import { useEffect, useState } from "react";
import { getDriverById } from "../../services/driverService";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment, getAllComments } from "../../services/commentService";
import { CommentForm } from "../Forms";
import "./Drivers.css";

export const DriverView = ({ currentUser }) => {
  const [driver, setDriver] = useState({});
  const [driverComments, setDriverComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const { driverId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDriverById(driverId).then((driverObj) => {
      setDriver(driverObj);
    });
    getAllComments().then((driverCommentsArray) => {
      setDriverComments(driverCommentsArray);
    });
  }, [driverId]);

  useEffect(() => {
    setFilteredComments(
      driverComments.filter((comment) => comment.driverId === driverId)
    );
  }, [driverComments, driverId]);

  const handleDeleteComment = (comment) => {
    deleteComment(comment).then(() =>
      getAllComments().then((commentsArray) => setDriverComments(commentsArray))
    );
  };

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
        {filteredComments.map((comment) => {
          return (
            <div className="driver-comment" key={comment.id}>
              {comment.commentContent}{" "}
              <div className="button-div">
                {currentUser.id === comment.userId ? (
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/editcomment/${comment.id}`)}
                  >
                    Edit
                  </button>
                ) : (
                  ""
                )}
                {currentUser.id === comment.userId ? (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
      <CommentForm
        setDriverComments={setDriverComments}
        currentUser={currentUser}
        driverComments={driverComments}
      />
    </>
  );
};
