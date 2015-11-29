// ./node_modules/.bin/babel-node example/demo2.js

import jsonEq from 'cl-jsoneq';
import {
    pair, obj, arr
}
from '../index';

let filter = obj([
    pair(
        v => v === 'a',
        obj([
            pair(
                v => v === 'b',
                obj([
                    pair(
                        v => v === 'c',
                        v => typeof v === 'number'
                    )
                ])
            )
        ])
    )
]);

console.log(filter({
    a: {
        b: {
            c: 123
        }
    }
}));