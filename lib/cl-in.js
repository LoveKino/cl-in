'use strict';

var _com = require('./com');

var _pair = require('./pair');

var _pair2 = _interopRequireDefault(_pair);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * compund pattern
 * 
 *     1. compund type
 *     
 *         obj
 *     
 *         array
 *
 *      2. key list pattern
 *
 *      3. key - value pattern
 *
 *          when key is pattern B then value is pattern B
 *
 *      pattern expression: pattern function
 */

module.exports = {
  obj: _com.obj,
  arr: _com.arr,
  pair: _pair2.default
};