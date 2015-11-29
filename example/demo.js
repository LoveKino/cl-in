// ./node_modules/.bin/babel-node example/demo.js

import jsonEq from 'cl-jsoneq';
import {
    pair, obj, arr
}
from '../index';

let filter = obj([
    pair(
        v => jsonEq(v, 'a'),
        arr([
            obj([
                pair(
                    v => jsonEq(v, 'c'),
                    v => typeof v === 'number')
            ])
        ], len => len < 3)
    ),
    pair(
        v => jsonEq(v, 'b'),
        v => typeof v === 'string'
    )
], (list) => jsonEq(list, ['a', 'b'], {
    order: false
}));

console.log(filter({
    a: [{
        c: 2
    }],
    b: "124"
}));