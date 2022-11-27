import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => (
    <div className="container-md m-2" style={{textAlign: 'center'}}>
        <Spinner role="status" animation="border" variant="info" size="xxl">
            <span className="visually-hidden">Loading...</span>
            {/* if you want your loading spinner to look crazy add this */}
            {/* <p>This is the loading screen it is signifying that you are waiting for a response</p> */}
        </Spinner>
    </div>
)


export default LoadingScreen