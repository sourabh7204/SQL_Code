import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';

  // Connect to MySQL
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sigma_app',
    password: 'sourabh7204',
  });

  

  try {
    const [result] = await connection.query("SHOW TABLES");
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  connection.end();

  // Generate Random User
  const getRandomUser = () => {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  };


//   console.log(getRandomUser());


