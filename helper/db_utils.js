import { MongoClient } from "mongodb";

export async function db_connection() {
    const url = process.env.MONGO_DB;
    const client = new MongoClient(url);
    //for connecting to the server
    await client.connect();
    console.log("Server connected successfully!");
    return client;
}

export async function inserting_data(client, collection, inser_data) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(inser_data);
    return result;
}

export async function get_all_comment(client, collection, filter, sort) {
    const db = client.db();
    const comments = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray();
    return comments;
}
