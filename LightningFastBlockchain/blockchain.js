const createHash = (data) => {
    return data + '*';
}

class Block {
    constructor(data, hash, lastHash){
        this.data = data;
        this.hash = hash;
        this.lastHash = lastHash;
    }
}

class BlockChain{
    constructor(){
        const genericBlock = new Block('genericData', 'genericHash', 'genericLastHash');
        this.chain = [genericBlock];
    }

    addBlocks(data){
        const lastHash = this.chain[this.chain.length -1].hash;
        const hash = createHash(data + lastHash);
        const block = new Block(data, hash, lastHash);
        this.chain.push(block);
    }

}

const fooBlockChain = new BlockChain();
fooBlockChain.addBlocks('one');
fooBlockChain.addBlocks('two');
fooBlockChain.addBlocks('three');

console.log(fooBlockChain);