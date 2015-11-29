let obj = (kvPatterns, keyListPattern) => {
    checkPatterns(kvPatterns);
    checkPattern(keyListPattern);
    return (v) => {
        if (!isPureObj(v))
            return false;

        // check key list
        if (keyListPattern) {
            let keys = getKeys(v);
            if (!keyListPattern(keys))
                return false;
        }

        if (kvPatterns && kvPatterns.length) {
            // check key-value
            for (let key in v) {
                let value = v[key];
                if (!checkKv(key, value, kvPatterns))
                    return false;
            }
        }

        return true;
    }
}

let arr = (valuePatterns, arrLenPattern) => {
    checkPatterns(valuePatterns);
    checkPattern(arrLenPattern);
    return (v) => {
        if (!isArray(v))
            return false;

        // check arr length
        if (arrLenPattern) {
            if (!arrLenPattern(v.length))
                return false;
        }

        // check key-value
        if (valuePatterns && valuePatterns.length) {
            for (let i = 0; i < v.length; i++) {
                let item = v[i];
                if (!checkValue(item, valuePatterns))
                    return false;
            }
        }

        return true;
    }
}

let checkPatterns = (patterns) => {
    if (patterns && !isArray(patterns)) {
        throw new TypeError(`Expect array type when patterns is not null. ${patterns}`);
    }
    for (let i = 0; i < patterns.length; i++) {
        if (!isFunction(patterns[i])) {
            throw new Error(`Expect function at index ${i} of patterns ${patterns}`);
        }
    }
}

let checkPattern = (pattern) => {
    if (pattern && !isFunction(pattern)) {
        throw new TypeError(`Expect function for ${pattern}`)
    }
}

let checkKv = (key, value, kvPatterns) => {
    for (let i = 0; i < kvPatterns.length; i++) {
        let kvPattern = kvPatterns[i];
        if (kvPattern(key, value))
            return true;
    }
    return false;
}

let checkValue = (value, valuePatterns) => {
    for (let i = 0; i < valuePatterns.length; i++) {
        let valuePattern = valuePatterns[i];
        if (valuePattern(value))
            return true;
    }
    return false;
}

let isPureObj = v => v && typeof v === 'object' && typeof v.length !== 'number';

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

let isFunction = v => typeof v === 'function';

let getKeys = (map) => {
    if (Object.keys) return Object.keys(map);
    let names = [];
    for (let name in map) {
        names.push(name);
    }
    return names;
}

module.exports = {
    arr,
    obj
}