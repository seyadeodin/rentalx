import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../modules/acccounts/entities/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";
import { CreateCategories1656185408501 } from "./migrations/1656185408501-CreateCategories";
import { CreateSpecifications1656287633178 } from "./migrations/1656287633178-CreateSpecifications";
import { CreateUsers1656541529963 } from "./migrations/1656541529963-CreateUsers";
import { AlterUserDeleteUsername1656617730487 } from "./migrations/1656617730487-AlterUserDeleteUsername";

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
    CreateUsers1656541529963,
    AlterUserDeleteUsername1656617730487,
  ],
  entities: [Category, Specification, User],
});

function createConnection(host = "localhost"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export { dataSource, createConnection };
