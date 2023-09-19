import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriverById } from "../../services/driverService";
import { postNewComment, getCategories } from "../../services/commentService";
import "./Forms.css";

export const CommentForm = ({ currentUser }) => {
  const [categories, setCategories] = useState([]);
  const [driver, setDriver] = useState({});
  const [commentCategory, setCommentCategory] = useState(0);
  const [driverComment, setDriverComment] = useState("");

  const { driverId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((categoryArray) => {
      setCategories(categoryArray);
    });
  }, []);

  useEffect(() => {
    getDriverById(driverId).then((driverObj) => {
      setDriver(driverObj);
    });
  }, [driverId]);

  const handleNewComment = (event) => {
    setDriverComment(event.target.value);
  };

  const handleCategorySelect = (event) => {
    setCommentCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const commentObj = {
      driverId: driver.driverId,
      categoryId: parseInt(commentCategory),
      userId: currentUser.id,
      commentContent: driverComment,
    };
    postNewComment(commentObj).then(() => {
      window.location.reload();
    });
  };

  return (
    <form className="driver-comment-form">
      <div className="fieldset-div">
        <fieldset>
          <h2>Add a comment</h2>
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
                      onChange={handleCategorySelect}
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
            <input
              className="comment-input"
              key="comment-area"
              name="comment"
              type="textarea"
              placeholder="leave a comment"
              onChange={handleNewComment}
              required
            />
          </div>
          <div className="comment-button-div">
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  );
};
