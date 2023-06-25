import apiUrl from '../apiConfig'
import axios from 'axios'

export const imageCreate = async (user, imgFile) => {
	await axios({
		method: 'POST',
		url: `${apiUrl}/image/${user}`,
		data: {

			img: imgFile
		},
		headers: {
			Authorization: `Token token=${user.token}`,

		},
	})
}