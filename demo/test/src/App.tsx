import './App.css';
import { useEffect } from 'react';
import { retryFetch } from 'retryable-fetch-ts';

function App() {
	useEffect(() => {
		console.log("loading react application")
		etryApiCalls()
	}, [])

	const etryApiCalls = async () => {
		const clientResp = await retryFetch('https://api.artic.edu/api/v1/artworks1', {}, 2000, 5000)
		console.log("in resp after request")
		console.log("-----------------------------------", clientResp)
	}
	return (
		<div className="App">
			<label>npm-package retryable-fetch</label>
		</div>
	);
}

export default App;
