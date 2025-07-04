import './App.css';
import { useEffect } from 'react';
// import { retryFetch } from './package_main.ts';
import { retryFetch} from 'retryable-fetch-ts';

function App() {
	useEffect(() => {
		document.title='retry-fetch-demo-tryout'
		console.log("loading react application")
		etryApiCalls()
	}, [])

		const etryApiCalls = async () => {
		const backendBseAPI='https://scaling-space-goldfish-gp5q7xj5g76f9p9w-3001.app.github.dev'
		
		
		const clientResp = await retryFetch(backendBseAPI+'/'+'artworks',{credentials:'include'})
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
