const {GENESIS_DATA, MINE_RATE} = require('./config')
const cryptoHash = require('./crypto-hash');

class Block {
    constructor({timeStamp, lastHash, hash, data, difficulty, nonce}){
        this.timeStamp = timeStamp;
        this.lastHash =  lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({lastBlock, data}){
        let timeStamp, hash;
        const lastHash = lastBlock.hash;
        let difficulty = lastBlock.difficulty; 
        let nonce = 0;

        do{
            nonce ++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timeStamp: this.mineBlock.timeStamp});
            hash = cryptoHash(timeStamp, data, lastHash, difficulty, nonce)

        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({timeStamp, lastHash, data, hash, nonce, difficulty});
    }

    static adjustDifficulty({originalBlock, timeStamp}){
        const {difficulty} = originalBlock;
        if(difficulty < 1) return 1;
        const difference = timeStamp - originalBlock.timeStamp;
        if(difference > MINE_RATE) return difficulty - 1;

        return difficulty + 1;
    }
}

module.exports =  Block;