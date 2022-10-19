const Joi = require('joi');
const mysql = require('../services/db.service');
const bcrypt = require('bcrypt');
const jwtService = require('../services/jwt.service');


const createUser = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/)).required(),
    })

    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(400).json({ message: schemaValidator.error.message || 'Bad Request!', code: 400 })
    } else {
        schemaValidator = schemaValidator.value
    }
    try {
        let getQuery = `select * from user where email like '${schemaValidator.email}'`;
        mysql.query(getQuery,async function (err, result) {
            if (err) throw err;

            if(!result || result.length!==0){
                return res.status(404).json({
                    message: "User already exists!",
                    status: 404
                })
            }else{
                let hashPassword = await bcrypt.hash(schemaValidator.password, 10);
                let query = "insert into user (username ,email, password) Values?";
                let params = [[schemaValidator.username,schemaValidator.email, hashPassword]];
        
                mysql.query(query, [params], function (err, result) {
                    if (err) throw err;
                    console.log("Number of records inserted: " + result.affectedRows);
                });
        
                return res.status(200).json({
                    message: "user register successfully",
                    status: 200
                })
        
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
}



    module.exports = {
        createUser
    }


