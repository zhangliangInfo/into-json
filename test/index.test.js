import IntoJSON from '../src/index'

test('converts a null value to an empty object', () => {
	const data = null
	const schema = {
		type: 'object'
	}
	const res = IntoJSON(data, schema)
	expect(res).toEqual({})
	expect(res).not.toBeNull()
})

test('converts the value to json', () => {
	const data = null
	const schema = {
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
	const res = IntoJSON(data, schema, false)
	const expectData = {
		name: '',
		value: null,
		children: [{
			name: '',
			value: null
		}]
	}
	expect(res).toEqual(expectData)
	expect(res).not.toBeNull()
})