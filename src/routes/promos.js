//Menunjukan bahwa kita butuh express framework
const express = require("express");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");

promosRouter.get("/", get);

promosRouter.post("/", create);

promosRouter.patch("/:id", edit);

promosRouter.delete("/:id", drop);

module.exports = promosRouter;
