const Block = require('./block');
const {GENESIS_DATA} = require('./config')

describe('Block', () => {
    const timeStamp = '03/07/2019';
    const lastHash = 'foo-lastHash';
    const hash = 'foo-hash';
    const data = ['blockchain','data'];
    const block = new Block({timeStamp, lastHash, hash, data});

    it('has a timestamp, lastHash, hash and data property',() => {
        expect(block.timeStamp).toEqual(timeStamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns a block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns the GENESIS_DATA', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

});