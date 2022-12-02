import apiUrl from '../apiConfig'
import axios from 'axios'

export const profileCreate = (user, userId, newProfile ) => {
	return axios({
		method: 'POST',
		url: `${apiUrl}/profiles/${userId}`,
		data: {
			profile: newProfile,
		},
		eaders: {
			Authorization: `Token token=${user.token}`,
		},
		
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