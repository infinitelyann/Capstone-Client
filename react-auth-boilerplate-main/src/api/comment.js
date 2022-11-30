import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createComment = (user, postId, newComment) => {
    console.log('the user in createComment', user)
    console.log('the newComment in createComment', newComment)
	return axios({
		url: `${apiUrl}/comments/${postId}`,
		method: 'POST',
		data: { comments: newComment },
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

// UPDATE comment
export const updateComment = (user, postId, updatedComment) => {
    console.log('this is updatedComment', updatedComment)
	return axios({
		url: `${apiUrl}/comments/${postId}/${updatedComment._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { comment: updatedComment }
	})
}

// DELETE comment
export const deleteComment = (user, postId, commentId) => {
	return axios({
		url: `${apiUrl}/comments/${postId}/${commentId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}