let mongoose = require("mongoose");

//local db connection settings
const ip = process.env.IP || '172.31.36.3';
mongoose.connect('mongodb://' +ip+ '/movies');

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

//define movie model in JSON key/value pairs
//values idicate the data type of each key
const mySchema = mongoose.Schema({
    title: { type: String, required: true },
    genre: String,
    price: String
});

module.exports = mongoose.model('movie', mySchema);


