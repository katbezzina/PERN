import pool from "../dbConfig.js";
import bcrypt from "bcrypt";
// import { verifyPassword, encryptPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
// import { issueToken } from "../utils/jwt.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT name,email FROM users");
    console.log("users", users);
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json({
      error: error,
      success: false,
    });
    console.error(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json({
      user: user.rows[0],
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      success: false,
    });
  }
};

export const register = async (req, res) => {
  console.log("req.body", req.body);
  const { name, email, password } = req.body;
  try {
    //first scernario
    const data = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already registeres; no need to register again.",
        success: false,
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.statys(err).json({
            error: "Error encrypting password",
            success: false,
          });
        const user = {
          name,
          email,
          password: hash,
        };
        pool.query(
          "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
          [user.name, user.email, user.password],
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                error: "Database error",
                success: false,
              });
            } else {
              const token = jwt.sign(
                {
                  // payload
                  email: user.email,
                },
                process.env.SECRET_KEY
              );
              res.status(200).send({
                success: true,
                name: user.name,
                jwt: token,
              });
            }
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registering the user",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered. Please register first.",
        success: false,
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(500).son({
            error: "Server error",
          });
        } else if (result === true) {
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            success: true,
            name: user.name,
            token: token,
          });
        } else {
          if (result != true)
            res.status(400).json({
              error: "Password is incorrect",
              success: false,
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.staus(500).json({
      error: "Database error occurred while signing in.",
      success: false,
    });
  }
};
