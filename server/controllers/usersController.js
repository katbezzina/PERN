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

// export const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("getuserbyid", id);
//     const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     res.status(200).json({
//       user: user.rows[0],
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error,
//       success: false,
//     });
//   }
// };

export const getMyUserProfile = async (req, res) => {
  try {
    // console.log("uid", req.userid);
    const profileDetails = await pool.query(
      // `SELECT avatar, username, email, name, userid FROM profiles, users WHERE profiles.userid = $1`,
      `SELECT avatar, username, name, email FROM users WHERE id = $1`,
      [req.user.id]
    );
    res.status(200).json(profileDetails.rows[0]);
  } catch (error) {
    res.status(500).json({
      error: error,
      success: false,
    });
  }
};

export const register = async (req, res) => {
  console.log("req.body", req.body);
  const { name, email, password, username, avatar } = req.body;
  try {
    //first scernario
    const data = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already registered; no need to register again.",
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
          avatar,
          username,
          password: hash,
        };
        pool.query(
          "INSERT INTO users (name, email, password, username, avatar) VALUES ($1,$2,$3,$4,$5)",
          [user.name, user.email, user.password, user.avatar, user.username],
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
            jwt: token,
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

export const updateUsername = async (req, res) => {
  console.log("req.user", req.user);
  const { username } = req.body;
  pool.query(
    `UPDATE users SET username = $1 WHERE id = $2;`,
    [username, req.user.id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Database error",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
        });
      }
    }
  );
};

// //Just for practice
// export const getProfile = async (req, res) => {
//   console.log("req.payload >>>>", req.payload);
//   res.status(201).json(`authorized request for ${req.payload.email}`);
// };

// //not used yet
// export const verification = async (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };
