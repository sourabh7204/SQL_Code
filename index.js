import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import express from "express";
const app=express();



// Create a connection
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sigma_app',
  password: 'sourabh7204',
});

// Generate a Random User
let getRandomUser = () => {
  return [
    faker.string.uuid(),            // Generates a unique ID
    faker.internet.username(),      
    faker.internet.email(),
    faker.internet.password(),
  ];
};



app.get("/", (req,res)=>{
  res.send("Welcome to home page");
});

app.listen("8080" , () =>{
  console.log("Server is Listening to 8080 Port...")
});

// // SQL query for multiple inserts
// let q = "INSERT INTO temp (id, username, email, password) VALUES ?";


// try {
//   // Use [data] to insert multiple rows correctly
//   const [result] = await connection.query(q, [data]);
//   console.log("Rows inserted successfully:", result);
// } catch (err) {
//   console.error("Error inserting rows:", err);
// }

// // Close the connection
// await connection.end();