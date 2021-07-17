import './utils/enviroment';

import mongoose, { ConnectionOptions } from 'mongoose';

const database =
  process.env.NODE_ENV === "testing"
    ? process.env.DATABASE_URI_TEST
    : process.env.DATABASE_URI;

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(database || "", dbOptions);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connected successfully");
});

connection.on("error", (err: Error) => {
  console.log(err);
  process.exit(0);
});
