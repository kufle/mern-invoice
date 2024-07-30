import chalk from "chalk";
import mongoose from "mongoose";
import { systemLogs } from '../utils/Logger.js';

const connectionToDB = async () => {
    try {
        const connectionParams = {
            dbName: process.env.DB_NAME
        }

        const connect = await mongoose.connect(
            process.env.MONGO_URI, //MONGO_URI env dari docker compose
            connectionParams
        );

        console.log(
            `${chalk.blue.bold(
                `MongoDB Connected: ${connect.connection.host}`
            )}`
        );

        systemLogs.info(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`${chalk.red.bold(`Error: ${error.message}`)}`);
        process.exit(1);
    }
}

export default connectionToDB;
