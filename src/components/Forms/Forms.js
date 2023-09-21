import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getDriverById } from "../../services/driverService";
import {
  postNewComment,
  getCategories,
  getAllComments,
} from "../../services/commentService";
import "./Forms.css";

export const CommentForm = ({ setDriverComments, currentUser }) => {
  const [categories, setCategories] = useState([]);
  const [driver, setDriver] = useState({});
  const [commentCategory, setCommentCategory] = useState(0);
  const [driverComment, setDriverComment] = useState("");
  const navigate = useNavigate();

  const { driverId } = useParams();

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
    postNewComment(commentObj).then(() => {navigate(0)});
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
            <textarea
              className="comment-input"
              key="comment-area"
              name="comment"
              placeholder="leave a comment"
              required
              type="textarea"
              onChange={handleNewComment}
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
