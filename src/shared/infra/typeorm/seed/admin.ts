import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { createConnection } from "..";

create().then(() => console.log("Admin user created!"));

async function create() {
  const connection = await createConnection();

  const id = uuidv4();
  const password = await hash("admin", 0);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'carteira_admin')
    `
  );

  await connection.destroy();
}
