const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });
        this.chain.push(newBlock);
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        
        for(let i=1; i<chain.length; i++){
            const {timeStamp, lastHash, hash, data} = chain[i];

            const actualLastHash = chain[i-1].hash;

            if(lastHash !== actualLastHash) return false;

            if(cryptoHash(timeStamp, lastHash, data) !== hash) return false;
        }
        
        return true;
    }

    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            return;
        }
        if(!BlockChain.isValidChain(newChain)){
            return;
        }
        this.chain = newChain;
    }
    
}

module.exports = BlockChain;