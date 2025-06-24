import './App.css';
import { retryFetch } from 'retryable-fetch-ts'
import { useEffect } from 'react';

function App() {
	useEffect(() => {
		retryFetch('https://api.artic.edu/api/v1/artworks', {}, 0, 0)
	}, [])

	return (
		<div className="App">
			<label>npm-package retryable-fetch</label>
		</div>
	);
}

export default App;
