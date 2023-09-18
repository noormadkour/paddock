import { useEffect, useState } from "react"
import { deleteComment, getAllComments, getCommentByUserId } from "../../services/commentService"
import { useNavigate } from "react-router-dom";

export const UserProfile = ({ currentUser }) => {
    const [allComments, setAllComments] = useState([])
    const [userComments, setUserComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllComments().then(commentArray => setAllComments(commentArray))
    }, [])

    useEffect(() => {
        setUserComments(allComments.filter(comment => comment.userId === currentUser.id))
      }, [allComments, currentUser])

    const handleDeleteComment = (comment) => {
        deleteComment(comment).then(() => getAllComments().then((commentsArray) => setAllComments(commentsArray)))
      }

    return (<div className="driver-comments-container">
    <div className="driver-comments-header">Comments: </div>
    {userComments.map((comment) => {
      return (
        <div className="driver-comment" key={comment.id}>
          {comment.commentContent}
          {currentUser.id === comment.userId ? (
            <button onClick={() => navigate(`/editcomment/${comment.id}`)}>Edit</button>
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
  </div>)
}