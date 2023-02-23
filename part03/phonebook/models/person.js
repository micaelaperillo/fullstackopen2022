const mongoose = requiere("mongoose");
require("dotenv").config();

const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

mongoose.connect(url, {})
    .then(() => console.log("connected to mongoDB"))
    .catch((er) => console.log("error: ", er));

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        minLength: 8
    },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Person", personSchema);