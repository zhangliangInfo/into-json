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
    global.constant = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  module.exports = ['$id', '$schema', '$ref', 'title', 'description', 'required']; // 'default',
  // 'example',
  // 'uniqueItems',
  // 'minItems',
  // 'maxItems',
  // 'items',
  // 'additionalItems',
  // 'exclusiveMinimum',
  // 'exclusiveMaximum',
  // 'multipleOf',
  // 'pattern',
  // 'minLength',
  // 'maxLength',
  // 'properties',
  // 'patternProperties',
  // 'dependencies',
  // 'additionaProperties',
  // 'minProperties',
  // 'maxProperties',
  // 'allOf',
  // 'anyOf',
  // 'oneOf',
  // 'not',
  // 'definations',
  // 'enum'
});