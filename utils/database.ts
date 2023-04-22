import { DataSource } from "typeorm";
import { userEntity } from "../model/userEntity";
import { productEntity } from "../model/productEntity";

export const database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Petxcanadi@2020",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [userEntity, productEntity],
});
