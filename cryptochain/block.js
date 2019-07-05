const {GENESIS_DATA} = require('./config')
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
        const difficulty = lastBlock.difficulty;
        let nonce = 0;

        do{
            nonce ++;
            timeStamp = Date.now();
            hash = cryptoHash(timeStamp, data, lastHash, difficulty, nonce)

        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({timeStamp, lastHash, data, hash, nonce, difficulty});
    }
}

module.exports =  Block;