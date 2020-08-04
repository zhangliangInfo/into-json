import React from 'react'
import ReactDOM from 'react-dom'
import IntoJSON from '../../src/index'

class ReactDemo extends React.Component {
	componentWillMount() {
		const data = null
		const schema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				value: { type: 'number' },
				children: {
					type: 'array',
				}
			}
		}
		const res = IntoJSON(data, schema, false)
		console.log(res)
	}

  render() {
    return <div>
      Hello World
    </div>
  }
}

const App = () => <ReactDemo />

ReactDOM.render(
  <App />,
  document.getElementById('root')
)