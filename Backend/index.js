const express = require('express');
const books = require('./routes/book');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017", {dbName: 'IGT_Books_Directory'});
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB();
const app = express();

app.use(express.json());
app.use('/api/v1', books);

app.listen(3000, () => {
  console.log(`Server up and running at PORT 3000`);
});