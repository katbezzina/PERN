import pool from "../dbConfig.js";

//SELECT avatar, username, title, description, price, postimage, postcode, createdat, postid, message, messagecreatedat FROM user_posts, users, comments WHERE ((users.id = user_posts.usersid) AND (postid = $1)) AND ((user_posts.postid = comments.c_postid))"

export const getAllComments = async (req, res) => {
  try {
    let c_postid = req.params.id;
    const response = await pool.query(
      "SELECT username, avatar, message, messagecreatedat, c_postid FROM users, comments WHERE c_postid = $1 AND c_usersid = users.id ORDER BY messagecreatedat DESC",
      [c_postid]
    );
    // console.log("response", response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
};
