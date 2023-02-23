require('dotenv').config()

const mongoose = require("mongoose");

if (process.argv.length < 5) {
    console.log("arguments: node mongo.js password name number");
    process.exit(1);
}

const password = process.argv[2];

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
});

console.log(person);

person.save().then((result) => {
    console.log(result);
    console.log("saved person");
    mongoose.connection.close();
});