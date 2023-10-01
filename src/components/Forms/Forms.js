import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getDriverById } from "../../services/driverService";
import {
  postNewComment,
  getCategories,
  getAllComments,
} from "../../services/commentService";
import "./Forms.css";

export const CommentForm = ({ setDriverComments, currentUser, driver }) => {
  const [categories, setCategories] = useState([]);
  // const [driver, setDriver] = useState({});
  const [commentCategory, setCommentCategory] = useState(0);
  const [driverComment, setDriverComment] = useState("");
  const [allCommenets, setAllComments] = useState([]);
  const [formState, setFormState] = useState({
    driverId: 0,
    categoryId: 0,
    userId: 0,
    commentContent: "",
  });
  const navigate = useNavigate();

  const { driverId } = useParams();

  useEffect(() => {
    getCategories().then((categoryArray) => {
      setCategories(categoryArray);
    });
  }, []);

  // useEffect(() => {
  //   getDriverById(driverId).then((driverObj) => {
  //     setDriver(driverObj);
  //   });
  // }, [driverId]);

  const handleNewComment = (event) => {
    setDriverComment(event.target.value);
  };

  const handleCategorySelect = (event) => {
    setCommentCategory(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //add if statement evaluating the state of the comments (no zeroes)

    const commentObj = {
      driverId: driver.driverId,
      categoryId: parseInt(commentCategory),
      userId: currentUser.id,
      commentContent: driverComment,
    };
    postNewComment(commentObj)
      .then(() => {
        setCommentCategory(0);
        setDriverComment("");
      })
      .then(() => {
        getAllComments().then((commentArray) => {
          setDriverComments(commentArray);
        });
      });
  };

  return (
    <form className="driver-comment-form" onSubmit={handleSubmit}>
      <div className="fieldset-div">
        <fieldset className="add-comment-form">
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
                      checked={commentCategory === category.id}
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
              value={driverComment}
              placeholder="leave a comment"
              required
              type="textarea"
              onChange={handleNewComment}
            />
          </div>
          <div className="comment-button-div">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  );
};
