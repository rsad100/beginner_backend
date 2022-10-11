const usersRepo = require("../repo/users");

const get = async (req, res) => {
  try {
    const response = await usersRepo.getUsers();
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const create = async (req, res) => {
  try {
    const response = await usersRepo.createUsers(req.body);
    res.response;
    res.status(201).json({ msg: "Data Created Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const edit = async (req, res) => {
  try {
    const response = await usersRepo.editUsers(req.body, req.params);
    res.response;
    res.status(200).json({ msg: "Data Changed Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await usersRepo.deleteUsers(req.params);
    res.response;
    res.status(200).json({ msg: "Data Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const usersController = {
  get,
  create,
  edit,
  drop,
};

module.exports = usersController;
