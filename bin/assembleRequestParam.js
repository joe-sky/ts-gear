"use strict";
exports.__esModule = true;
/** 将parameters中的成员添加到对应的query, body, path对象中 */
var addParamProperty = function (parameter, parameterSchema) {
    var property = {};
    if (parameter.description) {
        property.description = parameter.description;
    }
    if (parameter.type) {
        property.type = parameter.type;
    }
    // TODO 需要更多判断
    // $ref, type: array, type: object
    if (parameter.schema) {
        property.schema = parameter.schema;
    }
    if (parameter.type === 'array') {
        property.items = parameter.items;
    }
    if (!parameterSchema[parameter["in"]]) {
        parameterSchema[parameter["in"]] = {
            name: parameter["in"],
            type: 'object',
            required: [],
            properties: {},
            additionalProperties: false
        };
    }
    parameterSchema[parameter["in"]].properties[parameter.name] = property;
    if (parameter.required) {
        ;
        parameterSchema[parameter["in"]].required.push(parameter.name);
    }
    return parameter;
};
/** 将paths里的各种请求参数组装成IParameterSchema的结构 */
exports.assembleRequestParam = function (parameters) {
    var schema = {};
    parameters.forEach(function (parameter) {
        addParamProperty(parameter, schema);
    });
    return schema;
};
