import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.Promise = global.Promise;
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    });
    // console.log(conn)
    console.log(`💻 ${conn.connection.host} CONNECTED to the DB successfully`);
  } catch (err) {
    console.log(`Error ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
