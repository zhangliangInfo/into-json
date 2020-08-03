const utils 					= require('./utils')
const DEFINEDCONSTANT = require('./constant')
const v 				 			= require('./validator')
const getDataType 		= utils.getDataType
const transferData 		= utils.transferData
const recordErrors 		= utils.recordErrors
const initializeArray = utils.initializeArray

/**
	根据Schema对数据结构进行还原处理
*/
function restoreStruct(instance, schema) {
  for(let k in schema) {
    // 针对json schema模式常用的属性进行处理
    if(DEFINEDCONSTANT.includes(k)) continue;
    if(k == 'type') {
      if(instance === null || instance === undefined || getPropertyType(instance) !== schema[k]) {
        instance = transferData(schema[k]);
      }
    } else if(k == 'properties') {
      restoreStruct(instance, schema[k]);
    } else if(schema[k].properties) {
      instance[k] = transferData(schema[k].type);
      restoreStruct(instance[k], schema[k].properties);
    } else {
      if(instance[k] === null || instance[k] === undefined || getPropertyType(instance[k]) !== schema[k].type) {
        instance[k] = transferData(schema[k].type);
      }
      if(schema[k].type === 'array' && schema[k].items) {
        if(!instance[k].length) {
          instance[k] = initializeArray(schema[k]);
        }
        if(getPropertyType(instance[k]) === 'array') {
        }
        instance[k].forEach(ele => {
          restoreStruct(ele, schema[k].items);
        });
      }
    }
  }
  return instance;
}

function IntoJSON(instance, schema) {
  const valid = v.validate(instance, schema);
  if(valid.errors.length > 0) {
    recordErrors(true, schema, valid.errors);
  }
  return restoreStruct(instance, schema);
}

module.exports = IntoJSON;