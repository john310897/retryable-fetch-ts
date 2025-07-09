import './App.css';
import { useEffect, useState } from 'react';
import { retryFetch } from 'retryable-fetch-ts';

function App() {
	
	const [dataList, setDataList] = useState([])
	const [secondApiresp, setSecondApiResp] = useState(null)
	
	useEffect(() => {
		document.title = 'retry-fetch-demo-tryout'
		retryApiCalls()
	}, [])

	const retryApiCalls = async () => {
		const backendBseAPI = 'https://fictional-orbit-v5gvqp9gx9qhpv7g-3001.app.github.dev'

		// direct api call without failure
		await retryFetch(backendBseAPI + '/' + 'artworks', { credentials: 'include' }, 5000, 0).then(resp => {
			console.log(resp)
			setDataList(resp?.data)
		}).catch(err => {
			console.log('api failed after retrying....',err)
		})

		// api call with failure and with interval and timeout specified 
		await retryFetch(backendBseAPI + '/' + 'failure_api', { credential: 'include' }, 2000, 10000).then(resp => {
			console.log(resp)
		}).catch(err => {
			console.log('api failed after retrying ...')
			setSecondApiResp(err?.message)
		})
	}
	return (
		<div className="App">
			<label>npm-package retryable-fetch</label>
			<div style={{ height: '200px', overflow: 'hidden' }}>
				{dataList?.map((item: any, index: number) => (
					<p>{item?.artist_display}</p>
				))}
			</div>

			<hr />
			<div>
				<label>second api response after retrying</label>
				<p>{secondApiresp}</p>
			</div>



		</div>
	);
}

export default App;
