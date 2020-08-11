"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordErrors = exports.initializeArray = exports.convertData = exports.getDataType = void 0;
exports.getDataType = function (value) {
    return Object.prototype.toString.call(value).match(/\[object ([\w]*)\]/)[1].toLowerCase();
};
exports.convertData = function (type) {
    return type === 'object' ? {} :
        type === 'array' ? [] :
            type === 'string' ? '' :
                type === 'number' ? null :
                    type === 'integer' ? null :
                        type === 'boolean' ? null :
                            type === 'null' ? null :
                                type === 'undefined' ? undefined : null;
};
exports.initializeArray = function (schema) {
    var items = schema.items;
    if (items instanceof Array) {
        return items.map(function (ele) { return exports.convertData(ele.type); });
    }
    else if (items instanceof Object) {
        if (items.type) {
            return [exports.convertData(items.type)];
        }
        else {
            var obj = {};
            for (var k in items) {
                var _item = items[k];
                obj[k] = exports.convertData((_item).type);
            }
            return [obj];
        }
    }
    else {
        return [];
    }
};
exports.recordErrors = function (schema, errors, isConsole, isRecord, callback) {
    isConsole && console.log('The errors is ' + errors + '');
    if (!isRecord)
        return;
    typeof callback === 'function' && callback(errors);
};
