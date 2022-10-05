const express = require("express");

// import db
const postgreDb = require("./src/config/postgre"); //FLUFFY-JOURNEY-WEB11\src\config\postgre.js

// init express application
const server = express();

const PORT = 8070;

postgreDb
  .connect()
  .then(() => {
    console.log("DB connected");
    server.get("/api/v1/books", async (req, res) => {
      try {
        const result = await postgreDb.query(
          "select title,author from books where publisher = 'Hasta Mitra'"
        );
        res.json(result.rows);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          msg: "internal server Error",
        });
      }
    });
    server.listen(PORT, () => {
      console.log(`server is running at port ${PORT}`);
    });
    server.get("/", (req, res) => {
      res.json({
        msg: "welcome",
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

//http://localhost:8070/api/v1/books

// http route
// http://localhost:8080/
