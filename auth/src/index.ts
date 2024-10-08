import express from "express";
import { json } from "body-parser";
import mongoose from 'mongoose';
import User from './models/User';

const app = express();
app.use(json());

app.get("/api/users/currentuser", async (req, res) => {
  const user = await User.findById('658fa3e8fbeb4c1b84d325e4')
  res.send(user);
});

const connectToDB = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be defined');
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

connectToDB();
