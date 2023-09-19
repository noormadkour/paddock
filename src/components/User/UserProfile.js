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

  const handleDeleteComment = (comment) => {
    deleteComment(comment).then(() =>
      getAllComments().then((commentsArray) => setAllComments(commentsArray))
    );
  };

  return (<>
    <div className="user-info-container">
      <div className="user-info">
        <h2>Hey there, {currentUser.fullName}</h2>
        <p> Here are the comments you've made on various drivers</p>
      </div>
    </div>
    <div className="driver-comments-container">
      <div className="driver-comments-header">Comments: </div>
      {userComments.map((comment) => {
        return (
          <div className="driver-comment" key={comment.id}>
            {comment.commentContent}
            <div className="button-div">
              {currentUser.id === comment.userId ? (
                <button className="edit-button" onClick={() => navigate(`/editcomment/${comment.id}`)}>
                  Edit
                </button>
              ) : (
                ""
              )}
              {currentUser.id === comment.userId ? (
                <button className="delete-button" onClick={() => handleDeleteComment(comment)}>
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
