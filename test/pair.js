import assert from 'assert';
import clin from '../index';

describe('pair', () => {
    it('base', () => {
        let f1 = (v) => typeof v === 'number';
        let f2 = (v) => typeof v === 'string';

        let f = clin.pair(f1, f2);

        assert.equal(f(0, '2182'), true);
        assert.equal(f(1, 'hello'), true);
        assert.equal(f(1, 3290), false);
        assert.equal(f(0, {}), false);
    });
});