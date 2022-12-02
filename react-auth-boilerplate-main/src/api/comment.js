import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createComment = (user, postId, newComment) => {

	
	return axios({
		url: `${apiUrl}/comments/${postId}`,
		method: 'POST',
		data: { comment: newComment },
		// headers: {
		// 	Authorization: `Token token=${user.token}`,
		// },
	})

}

// UPDATE comment
export const updateComment = (user, postId, updatedComment) => {

	return axios({
		url: `${apiUrl}/comments/${postId}/${updatedComment._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { comments: updatedComment }
	})
}

// DELETE comment
export const deleteComment = (user, postId, commentId) => {
	return axios({
		url: `${apiUrl}/comments/${postId}/${commentId}`,
		method: 'DELETE',
		// headers: {
		// 	Authorization: `Token token=${user.token}`,
		// }
	})
}

//INDEX comment

export const indexComment = (user, postId, commentId)=> {
	return axios({
		method: 'GET',
		url: `${apiUrl}/comments/${postId}`,
	})
}