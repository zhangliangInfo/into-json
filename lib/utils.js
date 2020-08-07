"use strict";

var getDataType = module.exports.getDataType = function getDataType(value) {
  return Object.prototype.toString.call(value).match(/\[object ([\w]*)\]/)[1].toLowerCase();
};

var convertData = module.exports.convertData = function convertData(type) {
  return type === 'object' ? {} : type === 'array' ? [] : type === 'string' ? '' : type === 'number' ? null : type === 'integer' ? null : type === 'boolean' ? null : type === 'null' ? null : type === 'undefined' ? undefined : null;
};

var initializeArray = module.exports.initializeArray = function initializeArray(schema) {
  var items = schema.items;

  if (getDataType(items) === 'object') {
    if (items.type) {
      return [convertData(items.type)];
    } else {
      var obj = {};

      for (var k in items) {
        obj[k] = convertData(items[k].type);
      }

      return [obj];
    }
  } else if (getDataType(items) === 'array') {
    return items.map(function (ele) {
      return convertData(ele.type);
    });
  }
};

module.exports.recordErrors = function recordErrors(schema, errors, isConsole, isRecord, callback) {
  isConsole && console.log('The errors is ' + errors + '');
  if (!isRecord) return;
  typeof callback === 'function' && callback(errors);
};