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

export const postNewComment = (commentObj) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj),
  };

  return fetch("http://localhost:8088/driverComments", postOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // You can handle the response data here if needed
      return data;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch or processing
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    });
};

export const getCategories = () => {
  return fetch("http://localhost:8088/categories").then((res) => res.json());
};
