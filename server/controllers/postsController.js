import pool from "../dbConfig.js";

export const addPost = async (req, res) => {
  try {
    const { title, username, description, price, postcode, postimage } =
      req.body;
    const newPost = await pool.query(
      "INSERT INTO user_posts (title, username, description, price, postcode, postimage) VALUES($1, $2, $3, $4, $5, $6) RETURNING * ",
      [title, username, description, price, postcode, postimage]
    );
    console.log(req.body);
    res.json(newPost.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};

export const getPostDetails = async (req, res) => {
  try {
    let postid = req.params.id;
    const response = await pool.query(
      "SELECT avatar, username, title, description, price, postimage, postcode, createdat, postid FROM user_posts, users WHERE (users.id = user_posts.usersid) AND (postid = $1)",
      [postid]
    );
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT avatar, username, title, description, price, postimage, postcode, createdat, postid FROM user_posts, users WHERE users.id = user_posts.usersid ORDER BY createdat DESC"
    );
    // console.log("response", response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const myPosts = await pool.query(
      // `SELECT avatar, username, email, name, userid FROM profiles, users WHERE profiles.userid = $1`,
      `SELECT title, description, username, price, postimage, postcode, createdat, postid FROM user_posts, users WHERE (users.id = user_posts.usersid) AND (users.id = $1)`,
      [req.user.id]
    );
    res.status(200).json(myPosts.rows);
  } catch (error) {
    res.status(500).json({
      error: error,
      success: false,
    });
  }
};
