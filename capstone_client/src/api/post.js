import apiUrl from '../apiConfig'
import axios from 'axios'

export const postCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/posts',
		data: {
			post: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const postIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/posts'
	})
}

export const postShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/posts/' + id
	})
}

export const postUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/posts/' + id,
		data: {
			post: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const postDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/posts/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}