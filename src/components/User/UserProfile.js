import { useEffect, useState } from "react";
import {
  deleteComment,
  getAllComments
} from "../../services/commentService";
import { useNavigate } from "react-router-dom";
import "./User.css";

export const UserProfile = ({ currentUser }) => {
  const [allComments, setAllComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllComments().then((commentArray) => setAllComments(commentArray));
  }, []);

  useEffect(() => {
    setUserComments(
      allComments.filter((comment) => comment.userId === currentUser.id)
    );
  }, [allComments, currentUser]);

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() =>
      getAllComments().then((commentsArray) => setAllComments(commentsArray))
    );
  };

  return (<>
    <div className="user-info-container">
      <div className="user-info">
        <h1>Hey there, {currentUser.fullName}</h1>
        <p> Here are any comments you've made on drivers</p>
      </div>
    </div>
    <div className="driver-comments-container">
      <h2 className="driver-comments-header">Comments: </h2>
      {userComments.map((comment) => {
        return (
          <div className={`driver-comment-${comment.category.category}`} key={comment.id}>
          <div className="driver-comment-metadata">
            <div className="driver-comment-author">
              DriverId: {comment?.driverId}
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
                <button className="edit-button" onClick={() => navigate(`/editcomment/${comment.id}`)}>
                  Edit
                </button>
              ) : (
                ""
              )}
              {currentUser.id === comment.userId ? (
                <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}>
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
    </>
  );
};
