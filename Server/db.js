import mongoose, { connect } from "mongoose";


// connect to mongoDB
const MONGO_URI = "mongodb+srv://sjordan2010:MD9Y4sU3nQmqdZPr@swjcluster.ftcvaf4.mongodb.net/";


connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Dappback",
})
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

export default mongoose;