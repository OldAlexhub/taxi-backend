import mongoose from "mongoose";

const connectToDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log(`Connected Successfully to Mongo Database`);
  } catch (error) {
    console.log(`Failed to connect to Mongo Database`);
  }
};

export default connectToDB;
