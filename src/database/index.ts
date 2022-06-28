import "reflect-metadata";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1656185408501 } from "./migrations/1656185408501-CreateCategories";
import { CreateSpecifications1656287633178 } from "./migrations/1656287633178-CreateSpecifications";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: [
    CreateCategories1656185408501,
    CreateSpecifications1656287633178,
  ],
  entities: [Category, Specification],
});

function createConnection(host = "localhost"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export { dataSource, createConnection };
