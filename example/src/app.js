import React from 'react'
import ReactDOM from 'react-dom'
import IntoJSON from '../../src/index'
import Validator from 'jsonschema'
const v = new Validator.Validator()

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
		const schema3 = {
			"$schema": "http://json-schema.org/draft-07/schema#",
			title: 'Product',
			description: 'a product has many attributes.',
			type: 'object',
			properties: {
				title: {
					title: 'the title of prudoct.',
					type: 'string',
				},
				description: {
					description: 'desc of product',
					title: 'desc',
					type: 'string'
				},
				name: {
					description: 'name of the product',
					type: 'string'
				},
				value: {
					description: 'The unique identifier for a product',
					type: 'number'
				},
				extends: {
					title: 'extension',
					description: 'product extension information',
					type: 'array',
					items: {
						price: {
							description: 'price of the product',
							type: 'number',
							exclusiveMinimum: 0,
							exclusiveMaximum: 100
						},
						code: {
							description: 'code of the product',
							type: 'number'
						},
						description: {
							type: 'string'
						},
						minItems: 1, // 至少有一项
						uniqueItems: true, //
						required: {
							type: 'boolean'
						} 
					}
				}
			},
			required: ['title', 'name', 'value']
		}
		const res = IntoJSON(data, schema3, true, true, function(errors) {
			fetch('http://10.170.177.213:3001/api/postErrorsMsg', {
		    body: JSON.stringify({
		      interface: '/api/test',
		      user: 'testuser',
		      jsonschema: schema3,
		      errors
		    }),
		    credentials: 'include',
		    method: 'post'
		  })
		})
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