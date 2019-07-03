const Block = require('./block');
const {GENESIS_DATA} = require('./config')
const cryptoHash = require('./crypto-hash')

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

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined-data';
        const minedBlock = Block.mineBlock({lastBlock, data});

        it('returns a block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('its last hash value must be equal to hash value of last block', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the data', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets the timestamp', () => {
            expect(minedBlock.timeStamp).not.toEqual(undefined)
        });

        it('checks the crypto hash value to be equal', () => {
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timeStamp, data, minedBlock.lastHash))
        });
    });

});