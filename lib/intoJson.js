"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require('./utils');
var DEFINEDCONSTANT = require('./constant');
var v = require('./validator');
var getDataType = utils.getDataType;
var convertData = utils.convertData;
var recordErrors = utils.recordErrors;
var initializeArray = utils.initializeArray;
function restoreStruct(instance, schema, filter) {
    if (filter === void 0) { filter = false; }
    var _loop_1 = function (k) {
        if (filter && DEFINEDCONSTANT.includes(k))
            return "continue";
        if (k == 'type') {
            if (instance === null || instance === undefined || getDataType(instance) !== schema[k]) {
                instance = convertData(schema[k]);
            }
        }
        else if (k == 'properties') {
            restoreStruct(instance, schema[k]);
        }
        else if (schema[k].properties) {
            instance[k] = convertData(schema[k].type);
            restoreStruct(instance[k], schema[k].properties);
        }
        else {
            if (instance[k] === null || instance[k] === undefined || getDataType(instance[k]) !== schema[k].type) {
                instance[k] = convertData(schema[k].type);
            }
            if (schema[k].type === 'array' && schema[k].items) {
                if (!instance[k] || !instance[k].length) {
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
        _loop_1(k);
    }
    return instance;
}
function default_1(instance, schema, isConsole, isRecord, callback) {
    var valid = v.validate(instance, schema);
    if (valid.errors.length > 0) {
        recordErrors(schema, valid.errors, isConsole, isRecord, callback);
    }
    return restoreStruct(instance, schema, true);
}
exports.default = default_1;
