// Import required modules using ESM
import express from "express";
import path from "path";
import mysql from "mysql2/promise";
import { faker, tr } from "@faker-js/faker";
import methodOverride from "method-override";



// Define __dirname for ESM (since __dirname is not available in ESM)
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

// Set EJS as the view engine and define views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create a connection using async/await
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sigma_app",
  password: "sourabh7204",
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

// Home route to get user count
app.get("/", async (req, res) => {
  const q = `SELECT count(*) AS total_users FROM user`;

  try {
    const [rows] = await connection.query(q);
    let count = rows[0]["total_users"];
    res.render("home.ejs", {count}); // Pass total_users to EJS
  } catch (err) {
    console.error(err);
    res.send("Some error occurred in DB");
  }
});

//SHOW Route
app.get("/user", async (req,res)=>{
  let q= 'SELECT * FROM user';
  
    try {
      const [rows] = await connection.query(q);
      // console.log(rows);
      // res.send(rows); 
      res.render("showusers.ejs",{rows});
    } catch (err) {
      console.error(err);
      res.send("Some error occurred in DB");
    }
});

// Edit Route to fetch user by ID and display edit form
app.get("/user/:id/edit", async (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try {
    const [rows] = await connection.query(q);
    let user = rows[0];
    res.render("edit.ejs", { user: rows[0] });
  } catch (err) {
    console.error("Error:", err);
    res.send("Some error occurred in DB");
  }
});

// PATCH Route to modify user data
app.patch("/user/:id", async (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try {
    const [rows] = await connection.query(q,(err , result)=>{
      if(err) throw err;
      let user = rows[0];
      res.sendr(rows);
    });
    
  } catch (err) {
    console.error("Error:", err);
    res.send("Some error occurred in DB");
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server is Listening on Port 8080...");
});

