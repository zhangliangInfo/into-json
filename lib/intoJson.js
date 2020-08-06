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
    global.intoJson = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var utils = require('./utils');

  var DEFINEDCONSTANT = require('./constant');

  var v = require('./validator');

  var getDataType = utils.getDataType;
  var convertData = utils.convertData;
  var recordErrors = utils.recordErrors;
  var initializeArray = utils.initializeArray;

  function restoreStruct(instance, schema) {
    var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var _loop = function _loop(k) {
      // 针对json schema模式常用的属性进行处理: 只对顶层结构的字段处理
      if (filter && DEFINEDCONSTANT.includes(k)) return "continue";

      if (k == 'type') {
        if (instance === null || instance === undefined || getDataType(instance) !== schema[k]) {
          instance = convertData(schema[k]);
        }
      } else if (k == 'properties') {
        restoreStruct(instance, schema[k]);
      } else if (schema[k].properties) {
        instance[k] = convertData(schema[k].type);
        restoreStruct(instance[k], schema[k].properties);
      } else {
        if (instance[k] === null || instance[k] === undefined || getDataType(instance[k]) !== schema[k].type) {
          instance[k] = convertData(schema[k].type);
        }

        if (schema[k].type === 'array' && schema[k].items) {
          if (!instance[k].length) {
            instance[k] = initializeArray(schema[k]);
          }

          if (getDataType(instance[k]) === 'array') {
            instance[k].forEach(function (ele) {
              restoreStruct(ele, schema[k].items);
            });
          }
        }
      }
    };

    for (var k in schema) {
      var _ret = _loop(k);

      if (_ret === "continue") continue;
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


  function IntoJSON(instance, schema) {
    var isConsole = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var isRecord = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var callback = arguments.length > 4 ? arguments[4] : undefined;
    var valid = v.validate(instance, schema);

    if (valid.errors.length > 0) {
      recordErrors(schema, valid.errors, isConsole, isRecord, callback);
    }

    return restoreStruct(instance, schema, true);
  }

  module.exports = IntoJSON;
});