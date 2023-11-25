const mongoose = require("mongoose");

const databaseConnection = async () => {
  await mongoose.connect(process.env.DATABASE_URI).then((con) => {
    console.log(`Database is connected on: ${con.connection.host}`);
  });
};

module.exports = databaseConnection;
