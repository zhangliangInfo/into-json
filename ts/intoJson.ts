const utils 					= require('./utils')
const DEFINEDCONSTANT = require('./constant')
const v 				 			= require('./validator')
const getDataType 		= utils.getDataType
const convertData 		= utils.convertData
const recordErrors 		= utils.recordErrors
const initializeArray = utils.initializeArray
import { SchemaInterface } from './interface'

function restoreStruct(instance: any, schema: SchemaInterface, filter: Boolean = false): void {
  for(let k in schema) {
    // 针对json schema模式常用的属性进行处理: 只对顶层结构的字段处理
    if(filter && DEFINEDCONSTANT.includes(k)) continue
    if(k == 'type') {
      if(instance === null || instance === undefined || getDataType(instance) !== schema[k]) {
        instance = convertData(schema[k])
      }
    } else if(k == 'properties') {
      restoreStruct(instance, schema[k])
    } else if(schema[k].properties) {
      instance[k] = convertData(schema[k].type)
      restoreStruct(instance[k], schema[k].properties)
    } else {
      if(instance[k] === null || instance[k] === undefined || getDataType(instance[k]) !== schema[k].type) {
        instance[k] = convertData(schema[k].type)
      }
      if(schema[k].type === 'array' && schema[k].items) {
        if(!instance[k] || !instance[k].length) {
          instance[k] = initializeArray(schema[k])
        }
        if(getDataType(instance[k]) === 'array') {
	        instance[k].forEach(ele => {
	          restoreStruct(ele, schema[k].items)
	        })
        }
      }
    }
  }
  return instance;
}

/**
 * IntoJSON: 将instance根据schema进行转换
 * @Author zhangliang
 * @Date   2020-08-05
 * @param  {any} instance 需要处理的数据
 * @param  {json} schema json-schema
 * @param  {Boolean} isConsole 是否打印错误日志
 * @param  {Boolean} isRecord 是否记录错误日志
 * @return {any} 返回处理后的数据
 */
export default function(instance: any, schema: SchemaInterface, isConsole: Boolean, isRecord: Boolean, callback: any): any {
  const valid = v.validate(instance, schema)
  if(valid.errors.length > 0) {
    recordErrors(schema, valid.errors, isConsole, isRecord, callback)
  }
  return restoreStruct(instance, schema, true)
}