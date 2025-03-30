import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import express from "express";

const app = express();

// Create a connection
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sigma_app',
  password: 'sourabh7204',
});

// Generate a Random User
const getRandomUser = () => {
  return [
    faker.string.uuid(), // Generates a unique ID
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.get("/", async (req, res) => {
  const q = `SELECT count(*) AS user_count FROM user`;
  try {
    // Use async/await for the query
    const [result] = await connection.query(q);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.send("Some error in DB");
  }
});

app.listen(8080, () => {
  console.log("Server is Listening on Port 8080...");
});

// // Example SQL query for multiple inserts
// const q = "INSERT INTO temp (id, username, email, password) VALUES ?";
// const data = [getRandomUser(), getRandomUser(), getRandomUser()];

// try {
//   // Use async/await for multiple inserts
//   const [result] = await connection.query(q, [data]);
//   console.log("Rows inserted successfully:", result);
// } catch (err) {
//   console.error("Error inserting rows:", err);
// } finally {
//   // Close the connection
//   await connection.end();
// }