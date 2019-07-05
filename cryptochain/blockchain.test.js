const BlockChain = require('./blockchain');
const Block = require('./block');

describe('blockchain()', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new BlockChain();
        newChain = new BlockChain();
        originalChain =  blockchain.chain;

        blockchain.addBlock({data: 'The'});
        blockchain.addBlock({data: 'Big'});
        blockchain.addBlock({data: 'Bang'});
        blockchain.addBlock({data: 'Theory'});
    })

    it('contains a chain of array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({data : newData});

        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    });

    describe('isValidChain()', () => {
        describe('when the chain does not start with genesis block', () =>{
            it('returns false', () => {
                blockchain.chain[0] = {data: 'fake-genesis'};

                expect(BlockChain.isValidChain(blockchain.chain)).toBe(false);
            });
        })

        describe('when chain starts with a genesis block and have multiple blocks', () => {
            describe('when there is a changed lastHash reference', () => {
                it('returns false', () => {
                    blockchain.chain[3].lastHash = 'broken-lastHash';

                    expect(BlockChain.isValidChain(blockchain.chain)).toBe(false);
                });
            })

            describe('chain contains a block with any invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'some-evil-data';

                    expect(BlockChain.isValidChain(blockchain.chain)).toBe(false);
                });
            })

            describe('chain does not contains any invalid block', () => {
                it('returns true', () => {
                    expect(BlockChain.isValidChain(blockchain.chain)).toBe(true);
                });
            })
        })
    })

    describe('replaceChain()', () => {
        describe('when the new chain is not longer', () => {
            it('does not replace the chain', () => {
                newChain.chain[0] = {new:  'chain'}
                blockchain.replaceChain(newChain.chain);

                expect(blockchain.chain).toEqual(originalChain);
            });
        })

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({data: 'The'});
                newChain.addBlock({data: 'Big'});
                newChain.addBlock({data: 'Bang'});
                newChain.addBlock({data: 'Theory'});
                newChain.addBlock({data: 'isthebest'});
            })
            describe('and the new chain is invalid', () => {
                it('does not replace the chain', () => {
                    newChain.chain[1].data = "fake-genesis";
                    blockchain.replaceChain(newChain.chain);

                    expect(blockchain.chain).toEqual(originalChain);
                });
            })

            describe('and the new chain is valid', () => {
                it('replaces the chain', () => {
                    blockchain.replaceChain(newChain.chain);

                    expect(blockchain.chain).toEqual(newChain.chain);
                });
            })
        })
    })
})