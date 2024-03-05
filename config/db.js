import mongoose from "mongoose";

mongoose.connect(
  `${process.env.StringConnectionMongo}`
);

let db = mongoose.connection;

export default db;