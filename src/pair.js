let pair = (p1, p2) => {
    if (!isFunction(p1))
        throw new TypeError(`Expect function for p1 ${p1}`);
    if (!isFunction(p2))
        throw new TypeError(`Expect function for p2 ${p2}`);
    return (k, v) => p1(k) && p2(v);
}

let isFunction = v => typeof v === 'function';

export default pair;