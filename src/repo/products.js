const postgreDb = require("../config/postgre");

const getProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    let query = `select * from products`;
    if (queryParams.keyword) {
      query += ` where lower(name_product) like lower('%${queryParams.keyword}%')`;
    }
    if (queryParams.filter) {
      if (queryParams.keyword) {
        query += ` and lower(category) like lower('%${queryParams.filter}%')`;
      } else {
        query += ` where lower(category) like lower ('%${queryParams.filter}')`;
      }
    }
    if (queryParams.sort == "early_start") {
      query += ` order by starthours asc`;
    }
    if (queryParams.sort == "latest_start") {
      query += ` order by starthours desc`;
    }
    if (queryParams.sort == "early_end") {
      query += ` order by endhours asc`;
    }
    if (queryParams.sort == "latest_end") {
      query += ` order by endhours dsc`;
    }
    if (queryParams.sort == "unpopular") {
      query += ` order by sold asc`;
    }
    if (queryParams.func == "popular") {
      query += ` order by sold desc`;
    }
    if (queryParams.sort == "cheap") {
      query += ` order by price asc `;
    }
    if (queryParams.sort == "pricey") {
      query += ` order by price desc `;
    }

    console.log(query);
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createProducts = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products (image_product, name_product, price, desc_product, size, delivery, starthours, endhours, stock, category, sold) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
    const {
      image_product,
      name_product,
      price,
      desc_product,
      size,
      delivery,
      starthours,
      endhours,
      stock,
      category,
      sold,
    } = body;
    postgreDb.query(
      query,
      [
        image_product,
        name_product,
        price,
        desc_product,
        size,
        delivery,
        starthours,
        endhours,
        stock,
        category,
        sold,
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

const editProducts = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update products set ";
    const values = [];
    // {author, title, publisher}
    // logika ini dibuat dengan mengasumsikan ada middleware validasi
    // validasi untuk menghilangkan properti object dari body yang tidak diinginkan
    Object.keys(body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += `${key} = $${idx + 1} where id_product = $${idx + 2}`;
        values.push(body[key], params.id);
        return;
      }
      query += `${key} = $${idx + 1},`;
      values.push(body[key]);
    });
    //   res.json({
    //     query,
    //     values,
    //   });
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

const deleteProducts = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from products where id_product = $1";
    // OR => logika atau sql
    // "OR" => string OR
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const productsRepo = {
  getProducts,
  createProducts,
  editProducts,
  deleteProducts,
};

module.exports = productsRepo;
