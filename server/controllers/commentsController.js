import pool from "../dbConfig.js";

//SELECT avatar, username, title, description, price, postimage, postcode, createdat, postid, message, messagecreatedat FROM user_posts, users, comments WHERE ((users.id = user_posts.usersid) AND (postid = $1)) AND ((user_posts.postid = comments.c_postid))"

export const getAllComments = async (req, res) => {
  try {
    let c_postid = req.params.id;
    const response = await pool.query(
      "SELECT username, avatar, message, messagecreatedat, c_postid, commentid FROM users, comments WHERE c_postid = $1 AND c_usersid = users.id ORDER BY messagecreatedat DESC",
      [c_postid]
    );
    // console.log("response", response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
};

export const addComment = async (req, res) => {
  try {
    const uid = req.user.id;
    const pid = req.params.id;
    const { message } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comments (message, c_postid, c_usersid) VALUES ($1, $2, $3) RETURNING * ",
      [message, pid, uid]
    );
    console.log(req.body);
    res.status(200).json(newComment.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};