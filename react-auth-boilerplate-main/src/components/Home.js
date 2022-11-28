import React from "react"
import PostIndex from "./posts/PostIndex"
const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<PostIndex msgAlert={msgAlert}/>
		</>
	)
}

export default Home
