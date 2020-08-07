import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Counter } from '../../src/index'

class App extends React.Component {
	render() {
		return <div>
		{
			Counter('I\'m here')
		}
		</div>
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)
