import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriverById } from "../../services/driverService";
import { postNewComment, getCategories } from "../../services/commentService";

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
    event.preventDefault()

    const commentObj = {
      driverId: driver.driverId,
      categoryId: parseInt(commentCategory),
      userId: currentUser.id,
      commentContent: driverComment,
    };
    postNewComment(commentObj).then(() => { window.location.reload()});
  };

  return (
    <form>
      <h2>Add a comment</h2>
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
                    onChange={handleCategorySelect}
                  />
                  {category.category}
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <label>Comment: </label>
          <input
            name="comment"
            key="comment-area"
            type="textarea"
            placeholder="leave a comment"
            onChange={handleNewComment}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </fieldset>
    </form>
  );
};

export const LongEditForm = ({ currentUser }) => {
  //get comment by ID
  //filter all comments by currentUser.Id to get all comments
  return `This is the stand alone form for editing posted comments`;
};
