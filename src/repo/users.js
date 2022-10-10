const postgreDb = require("../config/postgre");

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select id_user, email, password, phone_number, address, display_name, first_name, last_name, birthday, gender, image_user from users";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createUsers = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into users ( email, password, phone_number, address, display_name, first_name, last_name, birthday, gender, image_user) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
    const {
      email,
      password,
      phone_number,
      address,
      display_name,
      first_name,
      last_name,
      birthday,
      gender,
      image_user,
    } = body;
    postgreDb.query(
      query,
      [
        email,
        password,
        phone_number,
        address,
        display_name,
        first_name,
        last_name,
        birthday,
        gender,
        image_user,
      ],
      (err, queryResult) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(queryResult);
      }
    );
  });
};

const editUsers = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update users set ";
    const values = [];
    Object.keys(body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += `${key} = $${idx + 1} where id_user = $${idx + 2}`;
        values.push(body[key], params.id);
        return;
      }
      query += `${key} = $${idx + 1},`;
      values.push(body[key]);
    });
    postgreDb
      .query(query, values)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const deleteUsers = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from users where id_user = $1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const usersRepo = {
  getUsers,
  createUsers,
  editUsers,
  deleteUsers,
};

module.exports = usersRepo;
