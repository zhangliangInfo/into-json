/**
  获取数据类型
*/
const getDataType = module.exports.getDataType = function getDataType(value) {
  return Object.prototype.toString.call(value).match(/\[object ([\w]*)\]/)[1].toLowerCase()
}

/**
  转换数据类型
*/
const transferData = module.exports.transferData = function transferData(type) {
  if(type === 'object') {
    return {}
  } else if(type === 'array') {
    return []
  }
}

/**
  初始化schema数组中的数据
*/
const initializeArray = module.exports.initializeArray = function initializeArray(schema) {
  const { items } = schema
  if(getDataType(items) === 'object') {
    if(items.type) {
      return[transferData(items.type)]
    } else {
      const obj = {}
      for(let k in items) {
        obj[k] = transferData(k.type)
      }
      return [obj]
    }
  } else if(getDataType(items) === 'array') {
    return items.map(ele => transferData(ele.type))
  }
}

/**
  记录错误信息
*/
module.exports.recordErrors = function recordErrors(isRecord, schema, errors) {
  console.log('The errors is ' + errors + '')
  if(!isRecord) return
  // axios.post('http://10.170.177.213:3001/api/postErrorsMsg', {
  //   interface: '/api/test',
  //   user: 'testuser',
  //   jsonschema: schema,
  //   errors
  // }, {
  //   withCredentials: true
  // })
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