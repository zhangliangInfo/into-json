(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.utils = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /**
    获取数据类型
  */
  var getDataType = module.exports.getDataType = function getDataType(value) {
    return Object.prototype.toString.call(value).match(/\[object ([\w]*)\]/)[1].toLowerCase();
  };
  /**
    转换数据类型
  */


  var transferData = module.exports.transferData = function transferData(type) {
    if (type === 'object') {
      return {};
    } else if (type === 'array') {
      return [];
    }
  };
  /**
    初始化schema数组中的数据
  */


  var initializeArray = module.exports.initializeArray = function initializeArray(schema) {
    var items = schema.items;

    if (getDataType(items) === 'object') {
      if (items.type) {
        return [transferData(items.type)];
      } else {
        var obj = {};

        for (var k in items) {
          obj[k] = transferData(k.type);
        }

        return [obj];
      }
    } else if (getDataType(items) === 'array') {
      return items.map(function (ele) {
        return transferData(ele.type);
      });
    }
  };
  /**
    记录错误信息
  */


  module.exports.recordErrors = function recordErrors(isRecord, schema, errors) {
    console.log('The errors is ' + errors + '');
    if (!isRecord) return; // axios.post('http://10.170.177.213:3001/api/postErrorsMsg', {
    //   interface: '/api/test',
    //   user: 'testuser',
    //   jsonschema: schema,
    //   errors
    // }, {
    //   withCredentials: true
    // })

    fetch('http://10.170.177.213:3001/api/postErrorsMsg', {
      body: JSON.stringify({
        "interface": '/api/test',
        user: 'testuser',
        jsonschema: schema,
        errors: errors
      }),
      credentials: 'include',
      method: 'post'
    });
  };
});