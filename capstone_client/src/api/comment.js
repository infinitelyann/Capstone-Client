import apiUrl from "../apiConfig";
import axios from "axios";

// CREATE
export const createComment = (user, postId, newComment) => {
  console.log("the user in createComment", user);
  console.log("the newComment in createComment", newComment);
  return axios({
    url: `${apiUrl}/comments/${postId}`,
    method: "POST",
    data: { comment: newComment },
  });
};

// UPDATE comment
export const updateComment = (user, postId, updatedComment) => {
  return axios({
    url: `${apiUrl}/comments/${postId}/${updatedComment._id}`,
    method: "PATCH",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: { comments: updatedComment },
  });
};

// DELETE comment
export const deleteComment = (user, postId, commentId) => {
  return axios({
    url: `${apiUrl}/${postId}/comments/${commentId}`,
    method: "DELETE",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  });
};

//INDEX comment

export const indexComment = (user, postId, commentId) => {
  return axios({
    method: "GET",
    url: `${apiUrl}/${postId}/comments`,
  });
};
