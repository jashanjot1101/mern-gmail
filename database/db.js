import mongoose from "mongoose";
import dotenv from 'dotenv';
//import User from "../model/User";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD; 

const Connection = () => {
    const DB_URI = `mongodb://${USERNAME}:${PASSWORD}@ac-cbgluhu-shard-00-00.zbftwuh.mongodb.net:27017,ac-cbgluhu-shard-00-01.zbftwuh.mongodb.net:27017,ac-cbgluhu-shard-00-02.zbftwuh.mongodb.net:27017/?ssl=true&replicaSet=atlas-s2jaqw-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        mongoose.connect(DB_URI, { useNewUrlParser: true });
        mongoose.set('strictQuery', false);
        console.log('Database connected sucessfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message)
    }
}

export default Connection;