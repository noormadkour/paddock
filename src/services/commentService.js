export const getCommentByDriver = (driverId) => {
  return fetch("http://localhost:8088/driverComments?_expand=user")
    .then((res) => res.json())
    .then((commentArray) => {
      const filteredComments = commentArray.filter(
        (comment) => comment.driverId === driverId
      );
      return filteredComments;
    });
};

export const getCommentById = (commentId) => {
  return fetch(`http://localhost:8088/driverComments?id=${commentId}`)
    .then((res) => res.json())
    .then((commentArray) => commentArray[0])
};

export const getCommentByUserId = (userId) => {
  return fetch(`http://localhost:8088/driverComments?userId=${userId}`)
    .then((res) => res.json())
    .then((commentArray) => commentArray[0])
};

export const getAllComments = () => {
  return fetch("http://localhost:8088/driverComments").then(res => res.json())
}

export const postNewComment = (commentObj) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj),
  };

  return fetch("http://localhost:8088/driverComments", postOptions)
};

export const editComment = (commentObj) => {
  const postOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj),
  };
  return fetch(`http://localhost:8088/driverComments/${commentObj.id}`, postOptions)
}

export const getCategories = () => {
  return fetch("http://localhost:8088/categories").then((res) => res.json());
};

export const deleteComment = (comment) => {
  return fetch(`http://localhost:8088/driverComments/${comment.id}`, {
      method: "DELETE"
    });
}