'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pair = function pair(p1, p2) {
    if (!isFunction(p1)) throw new TypeError('Expect function for p1 ' + p1);
    if (!isFunction(p2)) throw new TypeError('Expect function for p2 ' + p2);
    return function (k, v) {
        return p1(k) && p2(v);
    };
};

var isFunction = function isFunction(v) {
    return typeof v === 'function';
};

exports.default = pair;