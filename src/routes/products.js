//Menunjukan bahwa kita butuh express framework
const express = require("express");

const productsRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/products");

productsRouter.get("/", get);

productsRouter.post("/", create);

// id
// /api/v1/books/{id}
// params => req.params.namaVariabel
productsRouter.patch("/:id", edit);

productsRouter.delete("/:id", drop);

module.exports = productsRouter;
