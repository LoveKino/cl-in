import assert from 'assert';
import clin from '../index';
import jsonEq from 'cl-jsoneq';

describe('com', () => {
    it('obj:base', () => {
        let f = clin.obj([
            clin.pair(
                v => typeof v === 'string',
                v => v > 10
            )
        ]);

        assert.equal(f({}), true);

        assert.equal(f({
            "a": 11,
            "b": 12
        }), true);

        assert.equal(f({
            "a": 9,
            "b": 12
        }), false);

        assert.equal(f([]), false);
    });

    it('obj:deeper', () => {
        let f = clin.obj([
            clin.pair(
                v => typeof v === 'string',
                v => jsonEq({
                    a: 1
                }, v)
            )
        ]);

        assert.equal(f({
            "v": {
                a: 1
            }
        }), true);

        assert.equal(f({
            "a": 9,
            "b": 12
        }), false);
    });

    it('obj:keyListPattern', () => {
        let f = clin.obj([
            clin.pair(
                v => typeof v === 'string',
                v => v > 10
            )
        ], (list) => jsonEq(list, ['a', 'b'], {
            order: false
        }));

        assert.equal(f({
            a: 11,
            b: 12
        }), true);

        assert.equal(f({
            b: 12
        }), false);

        assert.equal(f({}), false);
    });

    it('arr:base', () => {
        let f = clin.arr([
            v => v > 10
        ]);

        assert.equal(f({}), false);
        assert.equal(f([]), true);
        assert.equal(f([11, 23, 20]), true);
        assert.equal(f([9, 30]), false);
    });

    it('arr:arrLenPattern', () => {
        let f = clin.arr([
            v => v > 10
        ], (len) => len > 1 && len < 4);

        assert.equal(f([]), false);
        assert.equal(f([11, 23, 20]), true);
        assert.equal(f([11, 30]), true);
        assert.equal(f([11, 23, 20, 50]), false);
    });
});