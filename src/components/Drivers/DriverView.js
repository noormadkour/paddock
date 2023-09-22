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
          <span className="driver-detail-header">Name: </span>
          <span className="driver-detail-info">
            {driver.givenName} {driver.familyName}
          </span>
        </div>
        <div>
          <span className="driver-detail-header">Driver Code: </span>
          <span className="driver-detail-info">{driver.code}</span>
        </div>
        <div>
          <span className="driver-detail-header">Permanent Number: </span>
          <span className="driver-detail-info">{driver.permanentNumber}</span>
        </div>
        <div>
          <span className="driver-detail-header">Nationality: </span>
          <span className="driver-detail-info">{driver.nationality}</span>
        </div>
        <div>
          <span className="driver-detail-header">Wiki Page: </span>
          <a href={driver.url} className="driver-detail-info">
            {driver.url}
          </a>
        </div>
      </div>
      <div className="driver-comments-container">
        <h2 className="driver-comments-header">Comments: </h2>
        {filteredComments.map((comment) => {
          return (
            <div className="driver-comment" key={comment.id}>
              <div className="driver-comment-metadata">
                <div className="driver-comment-author">
                  User: {comment?.user?.fullName}
                </div>
                <div className="driver-comment-category">
                  {" "}
                  Category: {comment?.category.category}
                </div>
              </div>
              <div className="driver-comment-content">
                {comment.commentContent}
              </div>
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
        driver={driver}
      />
    </>
  );
};
