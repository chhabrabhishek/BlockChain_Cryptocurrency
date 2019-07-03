const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
    it('returns a SHA-256 hash value', () => {
            expect(cryptoHash('foo'))
                .toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
    })

    it('must returns same hash value for same arguments in different order', () => {
        expect(cryptoHash('one', 'two', 'three'))
            .toEqual(cryptoHash('three', 'two', 'one'));
    })
})