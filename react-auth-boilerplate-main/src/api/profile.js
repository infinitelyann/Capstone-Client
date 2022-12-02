import apiUrl from '../apiConfig'
import axios from 'axios'

export const profileCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/profiles',
		data: {
			profile: data,
		},
		// headers: {
		// 	Authorization: `Token token=${user.token}`,
		// },
	})
}

export const profileIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/profiles'
	})
}

export const profileShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/profiles/' + id
	})
}

export const profileUpdate = (user, userId, updatedProfile) => {
    console.log('this is updatedProfile', updatedProfile)
	return axios({
		url: `${apiUrl}/profiles/${userId}/${updatedProfile._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { profile: updatedProfile }
	})
}

export const profileDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/profiles/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
			
		},
	})
}