import utils from '../src/utils'
const getDataType 		= utils.getDataType
const convertData 		= utils.convertData
const recordErrors 		= utils.recordErrors
const initializeArray = utils.initializeArray

test('get itself real type of the data', () => {
	const _array 	= []
	const _object = {}
	const _string = ''
	const _number = 0
	const _null 	= null
	const _undefined = undefined

	expect(getDataType(_array)).toBe('array')
	expect(getDataType(_object)).toBe('object')
	expect(getDataType(_string)).toBe('string')
	expect(getDataType(_number)).toBe('number')
	expect(getDataType(_null)).toBe('null')
	expect(getDataType(_undefined)).toBe('undefined')
})

test('converts the value to the disired data type', () => {
	expect(convertData('object')).toEqual({})
	expect(convertData('array')).toEqual([])
	expect(convertData('string')).toEqual('')
	expect(convertData('number')).toEqual(null)
	expect(convertData('null')).toEqual(null)
	expect(convertData('undefined')).toEqual(undefined)
})

describe('Converts the child elements of an array to the specified data type', () => {
	test('the child elements as object', () => {
		const schema = {
			type: 'array',
			items: {
				name: { type: 'string' },
				value: { type: 'number' },
				property: { type: 'object' },
				children: { type: 'array' }
			}
		}
		expect(initializeArray(schema)).toEqual([{
			name: '',
			value: null,
			property: {},
			children: []
		}])
	})

	test('the child elements as string', () => {
		const schema = {
			type: 'array',
			items: [{
				type: 'string'
			}]
		}
		expect(initializeArray(schema)).toEqual([""])
	})
})