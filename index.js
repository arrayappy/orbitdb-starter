
import { OrbitDB } from './orbit-db/index.js'

async function main() {
  const usersDB = new OrbitDB("users");
  await usersDB.initialize()
  await usersDB.saveDoc({ _id: '1', content: 'Hello World' });
  const doc = await usersDB.getDoc('1');
  console.log(doc);
}

main().catch(err => console.error(err));