import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL);
await client.connect();
const db = client.db(); // optional: specify db name if not in the URL
const projects = await db.collection('projects').find().toArray();
return new Response(JSON.stringify(projects), { status: 200 });