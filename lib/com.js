'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var obj = function obj(kvPatterns, keyListPattern) {
    checkPatterns(kvPatterns);
    checkPattern(keyListPattern);
    return function (v) {
        if (!isPureObj(v)) return false;

        // check key list
        if (keyListPattern) {
            var keys = getKeys(v);
            if (!keyListPattern(keys)) return false;
        }

        if (kvPatterns && kvPatterns.length) {
            // check key-value
            for (var key in v) {
                var value = v[key];
                if (!checkKv(key, value, kvPatterns)) return false;
            }
        }

        return true;
    };
};

var arr = function arr(valuePatterns, arrLenPattern) {
    checkPatterns(valuePatterns);
    checkPattern(arrLenPattern);
    return function (v) {
        if (!isArray(v)) return false;

        // check arr length
        if (arrLenPattern) {
            if (!arrLenPattern(v.length)) return false;
        }

        // check key-value
        if (valuePatterns && valuePatterns.length) {
            for (var i = 0; i < v.length; i++) {
                var item = v[i];
                if (!checkValue(item, valuePatterns)) return false;
            }
        }

        return true;
    };
};

var checkPatterns = function checkPatterns(patterns) {
    if (patterns && !isArray(patterns)) {
        throw new TypeError('Expect array type when patterns is not null. ' + patterns);
    }
    for (var i = 0; i < patterns.length; i++) {
        if (!isFunction(patterns[i])) {
            throw new Error('Expect function at index ' + i + ' of patterns ' + patterns);
        }
    }
};

var checkPattern = function checkPattern(pattern) {
    if (pattern && !isFunction(pattern)) {
        throw new TypeError('Expect function for ' + pattern);
    }
};

var checkKv = function checkKv(key, value, kvPatterns) {
    for (var i = 0; i < kvPatterns.length; i++) {
        var kvPattern = kvPatterns[i];
        if (kvPattern(key, value)) return true;
    }
    return false;
};

var checkValue = function checkValue(value, valuePatterns) {
    for (var i = 0; i < valuePatterns.length; i++) {
        var valuePattern = valuePatterns[i];
        if (valuePattern(value)) return true;
    }
    return false;
};

var isPureObj = function isPureObj(v) {
    return v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && typeof v.length !== 'number';
};

var isArray = function isArray(v) {
    return v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && typeof v.length === 'number';
};

var isFunction = function isFunction(v) {
    return typeof v === 'function';
};

var getKeys = function getKeys(map) {
    if (Object.keys) return Object.keys(map);
    var names = [];
    for (var name in map) {
        names.push(name);
    }
    return names;
};

module.exports = {
    arr: arr,
    obj: obj
};