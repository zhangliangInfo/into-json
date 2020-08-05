const IntoJSON = require('../../lib/index')

const data 		 = null
const schema 	 = {
	type: 'object',
	properties: {
		name: { type: 'array'},
		value: { type: 'object' }
	}
}

const res = IntoJSON.default(data, schema)
console.log(res)