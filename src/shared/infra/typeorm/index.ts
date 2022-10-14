import { DataSource, getConnectionOptions } from "typeorm";
import "reflect-metadata";

import { User } from "@modules/acccounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { CreateCategories1656185408501 } from "./migrations/1656185408501-CreateCategories";
import { CreateSpecifications1656287633178 } from "./migrations/1656287633178-CreateSpecifications";
import { CreateUsers1656541529963 } from "./migrations/1656541529963-CreateUsers";
// import { AlterUserDeleteUsername1656617730487 } from "./migrations/1656617730487-AlterUserDeleteUsername";
import { AlterUserAddAvatar1656773583535 } from "./migrations/1656773583535-AlterUserAddAvatar";
import { CreateCars1661298526598 } from "./migrations/1661298526598-CreateCars";
import { CreateSpecificationsCars1661995441460 } from "./migrations/1661995441460-CreateSpecificationsCars";
import { CreateCarImages1662937179776 } from "./migrations/1662937179776-CreateCarImages";
import { CreateRentals1663026824462 } from "./migrations/1663026824462-CreateRentals";

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
    // AlterUserDeleteUsername1656617730487,
    AlterUserAddAvatar1656773583535,
    CreateCars1661298526598,
    CreateSpecificationsCars1661995441460,
    CreateCarImages1662937179776,
    CreateRentals1663026824462,
  ],
  entities: [Category, Specification, User, Car, CarImage, Rental],
});

function createConnection(host = "localhost"): Promise<DataSource> {
  return dataSource
    .setOptions({
      host,
      database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
    })
    .initialize();
}

export { dataSource, createConnection };
