import { useEffect, useState } from "react";
import {
  getDriverById,
  getDriverImageById,
  getNumberOfWins,
  getTeamByDriverId,
} from "../../services/driverService";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment, getAllComments } from "../../services/commentService";
import { CommentForm } from "../Forms";
import "./Drivers.css";

export const DriverView = ({ currentUser }) => {
  const [driver, setDriver] = useState({});
  const [wins, setWins] = useState("");
  const [driversTeam, setDriversTeam] = useState({});
  const [driverComments, setDriverComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [driverPhotoURL, setDriverPhotoURL] = useState("");
  const { driverId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDriverById(driverId).then((driverObj) => {
      setDriver(driverObj);
    });
    getAllComments().then((driverCommentsArray) => {
      setDriverComments(driverCommentsArray);
    });
    getDriverImageById(driverId).then((driverObj) => {
      setDriverPhotoURL(driverObj.imageUrl);
    });
    getNumberOfWins(driverId).then((numberWins) => setWins(numberWins));
    getTeamByDriverId(driverId).then((teamObj) => setDriversTeam(teamObj));
  }, [driverId]);

  useEffect(() => {
    setFilteredComments(
      driverComments.filter((comment) => comment.driverId === driverId)
    );
  }, [driverComments, driverId]);

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() =>
      getAllComments().then((commentsArray) => setDriverComments(commentsArray))
    );
  };

  return (
    <>
      <div className="driver-detail-container" key={driver.driverId}>
        <div className="driver-detail-image-container">
          <img
            className="driver-detail-image"
            src={driverPhotoURL}
            alt={driverId}
          />
        </div>
        <div className="driver-detail-stats">
          <div className="driver-mini-flex">
            <div className="driver-detail-header">Name: </div>
            <span className="driver-detail-info">
              {driver.givenName} {driver.familyName}
            </span>
          </div>
          <div className="driver-mini-flex">
            <div className="driver-detail-header">Drives For: </div>
            <span className="driver-detail-info">{driversTeam.name}</span>
          </div>
          <div className="driver-mini-flex">
            <div className="driver-detail-header">DOB: </div>
            <span className="driver-detail-info">{driver.dateOfBirth}</span>
          </div>
          <div className="driver-mini-flex">
            <div className="driver-detail-header">Driver Code: </div>
            <span className="driver-detail-info">{driver.code}</span>
          </div>
          <div className="driver-mini-flex">
            <div className="driver-detail-header">Permanent Number: </div>
            <span className="driver-detail-info">{driver.permanentNumber}</span>
          </div>
          <div className="driver-mini-flex">
            <div className="driver-detail-header">Nationality: </div>
            <span className="driver-detail-info">{driver.nationality}</span>
          </div>
          <div className="driver-mini-flex">
            <div className="driver-detail-header">
              Number of Grand Prix wins:
            </div>
            <span className="driver-detail-info">{wins}</span>
          </div>
        </div>
      </div>
      <div className="main-comment-container">
        <div></div>
        <div className="driver-comments-container">
          <h2 className="driver-comments-header">Comments: </h2>
          {filteredComments.map((comment) => {
            return (
              <div
                className={`driver-comment-${comment.category.category}`}
                key={comment.id}
              >
                <div className="driver-comment-metadata">
                  <div className="driver-comment-author">
                    User: {comment?.user?.fullName}
                  </div>
                  <div className="driver-comment-category">
                    Category: {comment?.category.category}
                  </div>
                </div>
                <div className="driver-comment-content">
                  {comment.commentContent}
                </div>
                <div className="button-div">
                  {currentUser.id === comment.userId && (
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/editcomment/${comment.id}`)}
                    >
                      Edit
                    </button>
                  )}
                  {currentUser.id === comment.userId && (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
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
      </div>
    </>
  );
};
