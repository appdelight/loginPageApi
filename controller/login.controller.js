const Joi = require("joi");
const mysql = require("../services/db.service");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");

const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  let schemaValidator = schema.validate(req.body);
  if (schemaValidator.error) {
    return res
      .status(400)
      .json({
        message: schemaValidator.error.message || "Bad Request!",
        code: 400,
      });
  } else {
    schemaValidator = schemaValidator.value;
  }

  let getQuery = `select * from user where email = '${schemaValidator.email}'`;

  mysql.query(getQuery, async function (err, result) {
    if (err) throw err;
    // console.log(result, "opopopopopop");
    let password = result[0].password;
    const plainPass = await bcrypt.compare(schemaValidator.password, password);

    if (!result || result.length == 0) {
      return res.status(404).send({
        message: "Incorrect usernamne or password!",
        code: 404,
      });
    } else if (!plainPass) {
      return res.status(404).send({
        message: "Incorrect usernamne or password!",
        code: 404,
      });
    } else {
      const tokenPayload = {
        userId: result.id,
        username: result.username,
      };
      let token = await jwtService.generateToken(tokenPayload);

      return res.status(200).json({
        message: "login succcessfully",
        token,
        data: {
          id: result[0].id,
          username: result[0].username,
        },
        status: 200,
      });
    }
  });
};

module.exports = {
  login,
};
