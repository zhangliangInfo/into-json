import {
	TypeInterface,
	DataInterface,
	SchemaInterface,
	InitTempObj,
	RecordInterface
} from './interface'
/**
 * get the type of data
 */
export const getDataType: TypeInterface = function(value: any): string {
	return Object.prototype.toString.call(value).match(/\[object ([\w]*)\]/)[1].toLowerCase()
}

/**
 * converting data type
 */
export const convertData: DataInterface = function(type: string) {
	return type === 'object' ? {} :
         type === 'array' ? [] :
         type === 'string' ? '' :
         type === 'number' ? null :
         type === 'integer' ? null :
         type === 'boolean' ? null :
         type === 'null' ? null :
         type === 'undefined' ? undefined : null		
}

/**
 * init the value of array with schema
 */
export const initializeArray = (schema: SchemaInterface): any[] => {
	const { items } = schema	
	if(items instanceof Array) {
		return items.map(ele => convertData(ele.type))
	} else if(items instanceof Object) {
		if(items.type) {
			return [convertData(items.type)]
		} else {
			const obj: InitTempObj = {}
			for(let k in items) {
			let _item = items[k] as SchemaInterface
			obj[k] = convertData((_item).type)
			}
			return [obj]
		}
	} else {
		return []
	}
}

/**
 * record the errors message
 */
export let recordErrors: RecordInterface;
recordErrors = (schema, errors, isConsole, isRecord, callback) => {
	isConsole && console.log('The errors is ' + errors + '')
  if(!isRecord) return
  typeof callback === 'function' && callback(errors)
}
