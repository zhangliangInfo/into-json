/**
  获取数据类型
*/
const getDataType = module.exports.getDataType = function getDataType(value) {
  return Object.prototype.toString.call(value).match(/\[object ([\w]*)\]/)[1].toLowerCase()
}

/**
  转换数据类型
*/
const convertData = module.exports.convertData = function convertData(type) {
  return type === 'object' ? {} :
         type === 'array' ? [] :
         type === 'string' ? '' :
         type === 'number' ? null :
         type === 'null' ? null :
         type === 'undefined' ? undefined : null
}

/**
  初始化schema数组中的数据
*/
const initializeArray = module.exports.initializeArray = function initializeArray(schema) {
  const { items } = schema
  if(getDataType(items) === 'object') {
    if(items.type) {
      return [convertData(items.type)]
    } else {
      const obj = {}
      for(let k in items) {
        obj[k] = convertData(items[k].type)
      }
      return [obj]
    }
  } else if(getDataType(items) === 'array') {
    return items.map(ele => convertData(ele.type))
  }
}

/**
  记录错误信息
*/
module.exports.recordErrors = function recordErrors(isRecord, schema, errors) {
  console.log('The errors is ' + errors + '')
  if(!isRecord) return
  fetch('http://10.170.177.213:3001/api/postErrorsMsg', {
    body: JSON.stringify({
      interface: '/api/test',
      user: 'testuser',
      jsonschema: schema,
      errors
    }),
    credentials: 'include',
    method: 'post'
  })
}