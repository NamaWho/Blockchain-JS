const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
  }

  generateHash() {
    return SHA256(
      this.index,
      this.timestamp,
      JSON.stringify(this.data),
      this.previousHash
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "1/01/19", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * ADD A NEW BLOCK TO THE BLOCKCHAIN
   *
   * Insert the hash of the previous block inside the new one,
   * then recalculate the digest with the hash function.
   *
   * Each time you modify a property of Block class,
   * you should recalculate the hash
   * @param {} newBlock
   */

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.generateHash();
    this.chain.push(newBlock);
  }

  /**
   * Check validity of the chain controlling hashes
   * @param {*} this
   */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const curBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (curBlock.hash !== curBlock.generateHash()) return false;
      if (curBlock.previousHash !== prevBlock.hash) return false;
    }
    return true;
  }
}

let namaWhoBlockchain = new Blockchain();
let index = 0;

function getIndexNewBlock() {
  return ++index;
}

namaWhoBlockchain.addBlock(
  new Block(getIndexNewBlock(), new Date().toISOString(), { amount: 2 })
);

namaWhoBlockchain.addBlock(
  new Block(getIndexNewBlock(), new Date().toISOString(), { amount: 5 })
);

console.log(JSON.stringify(namaWhoBlockchain, null, 4));
