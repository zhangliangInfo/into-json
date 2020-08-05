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
  var transferData = utils.transferData;
  var recordErrors = utils.recordErrors;
  var initializeArray = utils.initializeArray;
  /**
  	根据Schema对数据结构进行还原处理
  */

  function restoreStruct(instance, schema) {
    var _loop = function _loop(k) {
      // 针对json schema模式常用的属性进行处理
      if (DEFINEDCONSTANT.includes(k)) return "continue";

      if (k == 'type') {
        if (instance === null || instance === undefined || getPropertyType(instance) !== schema[k]) {
          instance = transferData(schema[k]);
        }
      } else if (k == 'properties') {
        restoreStruct(instance, schema[k]);
      } else if (schema[k].properties) {
        instance[k] = transferData(schema[k].type);
        restoreStruct(instance[k], schema[k].properties);
      } else {
        if (instance[k] === null || instance[k] === undefined || getPropertyType(instance[k]) !== schema[k].type) {
          instance[k] = transferData(schema[k].type);
        }

        if (schema[k].type === 'array' && schema[k].items) {
          if (!instance[k].length) {
            instance[k] = initializeArray(schema[k]);
          }

          if (getPropertyType(instance[k]) === 'array') {}

          instance[k].forEach(function (ele) {
            restoreStruct(ele, schema[k].items);
          });
        }
      }
    };

    for (var k in schema) {
      var _ret = _loop(k);

      if (_ret === "continue") continue;
    }

    return instance;
  }

  function IntoJSON(instance, schema, isRecord) {
    var valid = v.validate(instance, schema);

    if (valid.errors.length > 0) {
      recordErrors(isRecord, schema, valid.errors);
    }

    return restoreStruct(instance, schema);
  }

  module.exports = IntoJSON;
});