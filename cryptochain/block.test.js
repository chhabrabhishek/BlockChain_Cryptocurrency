const Block = require('./block');
const {GENESIS_DATA, MINE_RATE} = require('./config')
const cryptoHash = require('./crypto-hash')

describe('Block', () => {
    const timeStamp = 2000;
    const lastHash = 'foo-lastHash';
    const hash = 'foo-hash';
    const data = ['blockchain','data'];
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({timeStamp, lastHash, hash, data, nonce, difficulty});

    it('has a timestamp, lastHash, hash, difficulty, nonce and data property',() => {
        expect(block.timeStamp).toEqual(timeStamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
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
            expect(minedBlock.hash)
                .toEqual(cryptoHash(
                    minedBlock.timeStamp,
                    data, 
                    minedBlock.lastHash, 
                    minedBlock.nonce, 
                    minedBlock.difficulty
                    )
                );
        });

        it('sets a `hash` that matches the difficulty criteria', () => {
            expect(minedBlock.hash.substring(0, minedBlock.difficulty))
                .toEqual('0'.repeat(minedBlock.difficulty));
        })

        it('adjusts the difficulty', () => {
            const possibleResults = [lastBlock.difficulty + 1, lastBlock.difficulty - 1]

            expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
        });
    });

    describe('adjustDifficulty()', () => {
        it('increases the difficulty when a block is mined quickly', () => {
            expect(Block.adjustDifficulty({originalBlock: block, timeStamp: timeStamp + MINE_RATE - 100})).toEqual(block.difficulty + 1)
        });

        it('decreases the difficulty when a block is mined slowly', () => {
            expect(Block.adjustDifficulty({originalBlock: block, timeStamp: block.timeStamp + MINE_RATE + 100})).toEqual(block.difficulty - 1)
        });

        it('has a lower limit of 1', () => {
            block.difficulty = -1;
            expect(Block.adjustDifficulty({originalBlock: block})).toEqual(1);
        })
    })
});