import { createLibp2p } from 'libp2p'
import { createHelia } from 'helia'
import { createOrbitDB } from '@orbitdb/core'
import { LevelBlockstore } from 'blockstore-level'
import { Libp2pOptions } from './orbit-db/libp2p.js'

// Create an IPFS instance.
const blockstore = new LevelBlockstore('./ipfs')
const libp2p = await createLibp2p(Libp2pOptions)
const ipfs = await createHelia({ libp2p, blockstore })

const orbitdb = await createOrbitDB({ ipfs })

const db = await orbitdb.open('users', { type: 'documents'})

// console.log('my-db address', db.address)

const d = await db.put({ _id: 'hello world 1', msg: 'writing 1 to db', views: 10, c:1 })
// console.log({d})
await db.put({ _id: 'hello world 2', msg: 'writing 2 to db', views: 5, c:2 })
await db.put({ _id: 'hello world 3', msg: 'writing 3 to db', views: 12, c:3 })
await db.put({ _id: 'hello world 3', msg: 'writing 4 to db', views: 15, c:3 })

const findFn = (doc) => doc.views > 5 && doc.c==1;
// console.log(await db.all())
console.log(await db.query(findFn))


