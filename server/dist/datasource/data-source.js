import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
import { User } from "../entity/User.js";
dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: true, // à mettre sur false en prod
    logging: false,
});
//# sourceMappingURL=data-source.js.map