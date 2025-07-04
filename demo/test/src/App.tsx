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
		const backendBseAPI='https://didactic-parakeet-p6grp74gqq5c66gj-3001.app.github.dev'
			
		const clientResp = await fetch(backendBseAPI+'/'+'artworks',{credentials:'include'}).then(resp=>{
			console.log(resp)
		})
		}
	return (
		<div className="App">
			<label>npm-package retryable-fetch</label>
		</div>
	);
}

export default App;
