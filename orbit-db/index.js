import { createLibp2p } from 'libp2p';
import { createHelia } from 'helia';
import { createOrbitDB } from '@orbitdb/core';
import { LevelBlockstore } from 'blockstore-level';
import { Libp2pOptions } from './libp2p.js';

class OrbitDB {
  constructor(dbName) {
    this.dbName = dbName;
    this.blockstore = new LevelBlockstore('./ipfs');
    this.libp2p = null;
    this.ipfs = null;
    this.orbitdb = null;
    this.db = null;
  }

  async initialize() {
    this.libp2p = await createLibp2p(Libp2pOptions);
    this.ipfs = await createHelia({ libp2p: this.libp2p, blockstore: this.blockstore });
    this.orbitdb = await createOrbitDB({ ipfs: this.ipfs });
    this.db = await this.orbitdb.open(this.dbName, { type: 'documents' });
  }

  async saveDoc(doc) {
    return this.db.put(doc);
  }

  async getDoc(id) {
    const doc = await this.db.get(id);
    return doc.value;
  }

  async getDocs(queryFn) {
    if (!queryFn) {
      return await this.db.all();
    }
    return await this.db.query(queryFn);
  }
}

export {
  OrbitDB
}