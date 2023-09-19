import { useNavigate, useParams } from "react-router-dom";
import {
  editComment,
  getCategories,
  getCommentById,
} from "../../services/commentService";
import { useEffect, useState } from "react";
import "./Forms.css";

export const LongEditForm = ({ currentUser }) => {
  const { commentId } = useParams();
  const [comment, setComment] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getCategories().then((categoryArray) => {
      setCategories(categoryArray);
    });
  }, []);

  useEffect(() => {
    getCommentById(commentId).then((comment) => setComment(comment));
  }, [commentId]);

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const commentObj = { ...comment };
    editComment(commentObj).then(() => {
      navigate(-1);
    });
  };

  return (
    <form className="edit-comment-form">
      <div className="fieldset-div">
        <fieldset>
          <h2>Edit your comment</h2>
          <label className="category-heading">Category: </label>
          <div className="radio-categories">
            {categories.map((category) => {
              return (
                <div className="category" key={category.id}>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={category.id === comment.categoryId}
                      onChange={(event) => {
                        const commentCopy = { ...comment };
                        commentCopy.categoryId = parseInt(event.target.value);
                        setComment(commentCopy);
                      }}
                      required
                    />
                    {category.category}
                  </label>
                </div>
              );
            })}
          </div>
          <label className="comment-heading">Comment: </label>
          <div className="comment-container">
            <textarea
              className="comment-input"
              key="comment-area"
              name="comment"
              placeholder="leave a comment"
              required
              type="textarea"
              value={comment.commentContent}
              onChange={(event) => {
                const commentCopy = { ...comment };
                commentCopy.commentContent = event.target.value;
                setComment(commentCopy);
              }}
            />
          </div>
          <div className="comment-button-div">
            <button className="submit-button" onClick={handleEditSubmit}>
              Confirm Edit
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  );
};
