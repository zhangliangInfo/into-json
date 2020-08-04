import React from 'react'
import ReactDOM from 'react-dom'
import IntoJSON from '../../src/index'

class ReactDemo extends React.Component {
	componentWillMount() {
		const data = {}
		const schema = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				value: { type: 'number' },
				children: {
					type: 'array',
				}
			},
			required: ['name', 'value', 'children']
		}
		const schema1 = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				value: { type: 'number' },
				children: {
					type: 'array',
					items: {
						type: 'array',
						name: { type: 'string' },
						value: { type: 'number' }
					}
				}
			}
		}
		const schema2 = {
			type: 'object',
			properties: {
				name: { type: 'string' },
				value: { type: 'number' },
				children: {
					type: 'array',
					items: {
						name: { type: 'string' },
						value: { type: 'number' },
						property: { type: 'object' },
						children: { type: 'array' }
					}
				}
			}
		}
		const res = IntoJSON(data, schema2, false)
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