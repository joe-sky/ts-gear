"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var url_join_1 = __importDefault(require("url-join"));
var lodash_1 = require("lodash");
var assembleRequestParam_1 = require("./assembleRequestParam");
var interceptor_1 = require("./interceptor");
var source_1 = require("./source");
var util_1 = require("./util");
var generateMockData_1 = require("./generateMockData");
/** 将paths里的各种请求参数组装成IProperty的数据结构 */
exports.generateRequests = function (schema, $RefsInPaths, pathMatcher) { return __awaiter(void 0, void 0, void 0, function () {
    var paths, basePath, url, tsContent, mockTsContent, _i, _a, path, _loop_1, _b, _c, _d, action, importTsContent;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                paths = schema.paths;
                basePath = schema.basePath;
                tsContent = [];
                mockTsContent = [
                    "const { info } = console\n  if (process && process.env && process.env.NODE_ENV === 'production') {\n    throw new Error('mockRequest only used in dev mode')\n  }\n",
                ];
                _i = 0, _a = Object.getOwnPropertyNames(paths);
                _e.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                url = _a[_i];
                path = paths[url];
                if (pathMatcher) {
                    if (typeof pathMatcher === 'function') {
                        if (!pathMatcher(url)) {
                            return [3 /*break*/, 5];
                        }
                    }
                    else if (!pathMatcher.test(url)) {
                        return [3 /*break*/, 5];
                    }
                }
                _loop_1 = function (action) {
                    var request, functionName, paramInterfaceName, parameterSchema_1, paramDefTsContent, responseType, mockResponseValue, response200$ref, response200, responseTsContent, urlPath, functionTsContent, mockFunctionTsContent;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!path.hasOwnProperty(action) || path[action].deprecated) {
                                    return [2 /*return*/, "continue"];
                                }
                                request = path[action];
                                functionName = "" + action + lodash_1.upperFirst(lodash_1.camelCase(url));
                                paramInterfaceName = '';
                                if (!(request.parameters && request.parameters.length > 0)) return [3 /*break*/, 2];
                                parameterSchema_1 = assembleRequestParam_1.assembleRequestParam(request.parameters);
                                paramInterfaceName = "I" + lodash_1.upperFirst(functionName) + "Param";
                                return [4 /*yield*/, source_1.compile(function (source) {
                                        var inter = source.addInterface({
                                            isExported: true,
                                            name: paramInterfaceName
                                        });
                                        lodash_1.forEach(parameterSchema_1, function (property, name) {
                                            // 当参数为请求体body时，会额外包裹一层
                                            // 应去掉这一层的属性
                                            if (name === 'body' && !lodash_1.isEmpty(property.properties)) {
                                                var keys = Object.getOwnPropertyNames(property.properties);
                                                if (keys.length > 0) {
                                                    var key = keys[0];
                                                    inter.addProperty({
                                                        name: name,
                                                        type: util_1.transformProperty(property.properties[key]),
                                                        hasQuestionToken: !property.required || property.required.length === 0
                                                    });
                                                }
                                            }
                                            else {
                                                inter.addProperty({
                                                    name: name,
                                                    type: util_1.transformProperty(property),
                                                    hasQuestionToken: !property.required || property.required.length === 0
                                                });
                                            }
                                        });
                                    })];
                            case 1:
                                paramDefTsContent = _a.sent();
                                tsContent.push(paramDefTsContent);
                                mockTsContent.push(paramDefTsContent);
                                _a.label = 2;
                            case 2:
                                responseType = 'Response';
                                response200$ref = lodash_1.get(request.responses, '200.schema.$ref', null);
                                if (response200$ref) {
                                    responseType = util_1.transformProperty(request.responses[200]);
                                    mockResponseValue = generateMockData_1.generateMockData(lodash_1.get(request.responses, '200.schema', null), schema.definitions);
                                    // 否则可能是response中行内定义的数据结构
                                    // 再单独生成一个type
                                }
                                else {
                                    response200 = lodash_1.get(request.responses, '200', null);
                                    if (response200) {
                                        responseType = lodash_1.upperFirst(functionName) + "Response";
                                        responseTsContent = "type " + responseType + " = " + util_1.transformProperty(response200);
                                        tsContent.push(responseTsContent);
                                        mockTsContent.push(responseTsContent);
                                        mockResponseValue = generateMockData_1.generateMockData(response200, schema.definitions);
                                    }
                                }
                                urlPath = url_join_1["default"](basePath, util_1.transformPathParameters(String(url))).replace(/\\/g, '');
                                return [4 /*yield*/, source_1.compile(function (source) {
                                        var functionData = {
                                            name: functionName,
                                            isExported: true,
                                            // 把basePath加上
                                            // 但是host没加，应该大多数情况都会在生产环境通过代理跨域，host不会是swagger里定义的host
                                            // 如果需要加在interceptor里每个项目自行处理添加
                                            statements: "\n            const [ url, option ] = " + interceptor_1.interceptRequest.name + "('" + urlPath + "'" + (paramInterfaceName ? ', param' : '') + ")\n            option.method = " + functionName + ".method\n            return fetch(url, option).then" + (responseType ? '<' + responseType + '>' : '') + "(" + interceptor_1.interceptResponse.name + ")\n          "
                                        };
                                        if (paramInterfaceName) {
                                            functionData.parameters = [
                                                {
                                                    name: 'param',
                                                    type: paramInterfaceName
                                                },
                                            ];
                                        }
                                        if (request.summary || request.description) {
                                            functionData.docs = [lodash_1.remove([request.summary || '', request.description || ''], function (s) { return !!s; }).join('\n')];
                                        }
                                        source.addFunction(functionData);
                                    })];
                            case 3:
                                functionTsContent = _a.sent();
                                tsContent.push(functionTsContent);
                                tsContent.push(functionName + ".method = '" + action + "'\n");
                                return [4 /*yield*/, source_1.compile(function (source) {
                                        var returnStatement = '';
                                        var responseStatement = '';
                                        if (mockResponseValue) {
                                            responseStatement = "const response = new Response('" + JSON.stringify(mockResponseValue) + "', {\n              headers: { 'Content-Type' : 'application/json' }\n            })";
                                            returnStatement = "Promise.resolve(response).then" + (responseType ? '<' + responseType + '>' : '') + "(" + interceptor_1.interceptResponse.name + ")";
                                        }
                                        else {
                                            responseStatement = "const response = new Response('', {\n              headers: { 'Content-Type' : 'application/json' }\n            })";
                                            returnStatement = 'Promise.resolve(response)';
                                        }
                                        var functionData = {
                                            name: functionName,
                                            isExported: true,
                                            // 把basePath加上
                                            // 但是host没加，应该大多数情况都会在生产环境通过代理跨域，host不会是swagger里定义的host
                                            // 如果需要加在interceptor里每个项目自行处理添加
                                            statements: "\n            const [ url, option ] = " + interceptor_1.interceptRequest.name + "('" + urlPath + "'" + (paramInterfaceName ? ', param' : '') + ")\n            option.method = " + functionName + ".method\n            info('mock fetch: ', url, 'with " + action + " http method, fetch param: ', " + (paramInterfaceName ? 'param' : 'undefined') + ")\n            " + responseStatement + "\n            Reflect.defineProperty(response, 'url', {\n              value: url,\n            })\n            return " + returnStatement + "\n          "
                                        };
                                        if (paramInterfaceName) {
                                            functionData.parameters = [
                                                {
                                                    name: 'param',
                                                    type: paramInterfaceName
                                                },
                                            ];
                                        }
                                        if (request.summary || request.description) {
                                            functionData.docs = [lodash_1.remove([request.summary || '', request.description || ''], function (s) { return !!s; }).join('\n')];
                                        }
                                        source.addFunction(functionData);
                                    })];
                            case 4:
                                mockFunctionTsContent = _a.sent();
                                mockTsContent.push(mockFunctionTsContent);
                                mockTsContent.push(functionName + ".method = '" + action + "'\n");
                                return [2 /*return*/];
                        }
                    });
                };
                _b = [];
                for (_c in path)
                    _b.push(_c);
                _d = 0;
                _e.label = 2;
            case 2:
                if (!(_d < _b.length)) return [3 /*break*/, 5];
                action = _b[_d];
                return [5 /*yield**/, _loop_1(action)];
            case 3:
                _e.sent();
                _e.label = 4;
            case 4:
                _d++;
                return [3 /*break*/, 2];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [4 /*yield*/, source_1.compile(function (source) {
                    // 添加interptor拦截器依赖
                    source.addImportDeclarations([
                        {
                            namedImports: [
                                {
                                    name: interceptor_1.interceptRequest.name
                                },
                                {
                                    name: interceptor_1.interceptResponse.name
                                },
                            ],
                            moduleSpecifier: './interceptor'
                        },
                    ]);
                    // 导入definitions中的依赖
                    source.addImportDeclarations([
                        {
                            namedImports: $RefsInPaths,
                            moduleSpecifier: './definitions'
                        },
                    ]);
                })];
            case 7:
                importTsContent = _e.sent();
                tsContent.unshift(importTsContent);
                mockTsContent.unshift(importTsContent);
                return [2 /*return*/, {
                        requestsContent: tsContent.join('\n'),
                        mockRequestsContent: mockTsContent.join('\n')
                    }];
        }
    });
}); };
