import { useNavigate, useParams } from "react-router-dom";
import {
  editComment,
  getAllComments,
  getCategories,
  getCommentById,
} from "../../services/commentService";
import { useEffect, useState } from "react";
import { getDriverById } from "../../services/driverService";

export const LongEditForm = ({ currentUser }) => {
  const { commentId } = useParams();
  const [comment, setComment] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

    const commentObj = {...comment};
    editComment(commentObj).then(() => {
      window.location.reload();
    });
  };

  return (
    <form>
      <h2>Edit your comment</h2>
      <fieldset>
        <div>
          <label>Category: </label>
          {categories.map((category) => {
            return (
              <div key={category.id}>
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
        <div>
          <label>Comment: </label>
          <textarea
            name="comment"
            key="comment-area"
            type="textarea"
            value={comment.commentContent}
            placeholder="leave a comment"
            onChange={(event) => {
              const commentCopy = { ...comment };
              commentCopy.commentContent = event.target.value;
              setComment(commentCopy);
            }}
            required
          />
        </div>
        <button onClick={handleEditSubmit}>Submit</button>
      </fieldset>
    </form>
  );
};
