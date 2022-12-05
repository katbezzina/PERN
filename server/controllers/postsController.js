import pool from "../dbConfig.js";

export const getPostDetails = async (req, res) => {
  try {
    let postid = req.params.id;
    const response = await pool.query(
      "SELECT avatar, username, title, description, price, postimage, postcode, createdat, postid FROM user_posts, users WHERE (users.id = user_posts.usersid) AND (postid = $1)",
      [postid]
    );
    res.json(response.rows[0]);
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
      `SELECT title, description, username, price, postimage, postcode, createdat, postid FROM user_posts, users WHERE (users.id = user_posts.usersid) AND (users.id = $1) ORDER BY createdat DESC`,
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

export const addPost = async (req, res) => {
  try {
    const uid = req.user.id;
    const { title, description, price, postcode, postimage } = req.body;
    const newPost = await pool.query(
      "INSERT INTO user_posts (title, description, price, postcode, postimage, usersid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ",
      [title, description, price, postcode, postimage, uid]
    );
    console.log(req.body);
    res.status(200).json(newPost.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};

export const updateMyPost = async (req, res) => {
  console.log("req.user", req.user);
  const postid = req.params.id;
  const uid = req.user.id;
  const { title, description, price, postcode, postimage } = req.body;
  pool.query(
    `UPDATE user_posts SET title = $1, description = $2, price = $3, postcode = $4, postimage = $5 WHERE postid = $6 and usersid = $7;`,
    [title, description, price, postcode, postimage, postid, uid],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Database update my post error",
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

export const deleteMyPost = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM user_posts WHERE postid = $1`, [id]);
    res.json("my post was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};
