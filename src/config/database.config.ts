export default {
  uri: process.env.MONGO_URI,
  useFindAndModify: false,
  useCreateIndex: true,
  dbName: process.env.DB_NAME,
};
