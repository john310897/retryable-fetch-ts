# retryable-fetch-ts

[![NPM version](https://img.shields.io/badge/npm-v10.7.0-brightgreen)](https://www.npmjs.com/package/retryable-fetch-ts)
[![NODE version](https://img.shields.io/badge/node-v20.14.0-brightgreen)](https://www.npmjs.com/package/retryable-fetch-ts)
[![types](https://img.shields.io/badge/types-TypeScript-blue)](https://www.npmjs.com/package/retryable-fetch-ts)
[![license](https://img.shields.io/github/license/john310897/retryable-fetch-ts)]()

`retryable-fetch-ts` is a lightweight TypeScript package designed to simplify API fetching with built-in support for automatic retries and configurable timeouts. It is particularly useful in scenarios where network reliability is uncertain, and repeated attempts are necessary to ensure successful API communication.

demo version [working example](https://john310897.github.io/retryable-fetch-ts/)
(refer the demo folder for the example code in the github repo)

### Feautures

* Automatic Retry Logic: Automatically retries failed API requests based on a user-defined retry interval and maximum retry count.
* Configurable Timeout: Allows setting a timeout duration to limit how long the fetch operation should continue attempting retries.
* Customizable Parameters: Supports flexible configuration for retry intervals, maximum attempts, and timeout thresholds.
* Lightweight and Easy to Use: Minimal dependencies and a simple API make it easy to integrate into any TypeScript or JavaScript project.
* Improved Reliability: Ideal for use cases where APIs may intermittently fail and require multiple attempts to succeed.

### Installation

```bash
npm install retryable-fetch-ts
```

### Usage Example

```tsx
import { retryFetch } from 'retryable-fetch-ts';

function App() {
	const [dataList, setDataList] = useState([])
	const [secondApiresp, setSecondApiResp] = useState(null)

    useEffect(() => {
		retryApiCalls()
	}, [])

    const retryApiCalls = async () => {
		const backendBseAPI = 'https://fictional-orbit-v5gvqp9gx9qhpv7g-3001.app.github.dev' //you might have to change this to your specs

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
```

### 🔧 Parameters

| Parameter | Type     | Description                                                                 |
|-----------|----------|-----------------------------------------------------------------------------|
| `api`     | `string` | The API endpoint URL to be fetched.                                         |
| `metadata`| `object` | Optional metadata or request options (e.g., headers, body, method).         |
| `interval`| `number` | Time (in milliseconds) between each retry attempt.                          |
| `timeout` | `number` | Maximum duration (in milliseconds) to keep retrying before giving up.       |

### Contributing

We welcome contributions! Feel free to submit issues, feature requests, or pull requests to help improve this package.
