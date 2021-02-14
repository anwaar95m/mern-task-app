/** @format */

const { MongoClient, ObjectID } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    const db = client.db(databaseName);
    const myquery = { completed: true };
    const newvalues = { $set: { completed: false } };
    db.collection("tasks").updateMany(myquery, newvalues, (error, result) => {
      if (error) {
        return console.log("Updated tasks status");
      }
      console.log(result);
    });
  }
);
