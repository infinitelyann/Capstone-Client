import apiUrl from '../apiConfig'
import axios from 'axios'

export const userIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/users'
	})
}