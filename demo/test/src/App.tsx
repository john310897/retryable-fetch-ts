import './App.css';
import { useEffect, useState } from 'react';
// import { retryFetch } from './package_main.ts';
import { retryFetch } from 'retryable-fetch-ts';

function App() {
	const [dataList, setDataList] = useState([])
	useEffect(() => {
		document.title = 'retry-fetch-demo-tryout'
		console.log("loading react application")
		etryApiCalls()
	}, [])

	const etryApiCalls = async () => {
		const backendBseAPI = 'https://fictional-orbit-v5gvqp9gx9qhpv7g-3001.app.github.dev'

		await retryFetch(backendBseAPI + '/' + 'artworks', { credentials: 'include' },5000, 0).then(resp => {
			console.log(resp)
			setDataList(resp?.data)
		})

		await retryFetch(backendBseAPI+'/'+'failure_api',{credential:'include'},2000,10000).then(resp=>{
			console.log(resp)
		})
	}
	return (
		<div className="App">
			<label>npm-package retryable-fetch</label>
			{dataList?.map((item:any, index:number) => (
				<p style={{width:'50px'}}>{item?.artist_display}</p>
			))}
			<p></p>

		</div>
	);
}

export default App;
