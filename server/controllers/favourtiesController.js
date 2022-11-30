import pool from "../dbConfig.js";

export const addFavourite = async (req, res) => {
  try {
    const uid = req.user.id;
    const pid = req.params.id;
    const newFavourite = await pool.query(
      "INSERT INTO favourites (postid, usersid) VALUES ($1, $2) RETURNING * ",
      [pid, uid]
    );
    console.log(req.body);
    res.status(200).json(newFavourite.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteMyFavourite = async (req, res) => {
  try {
    const uid = req.user.id;
    const pid = req.params.id;
    await pool.query(
      `DELETE FROM favourites WHERE usersid = $1 AND postid = $2`,
      [uid, pid]
    );
    res.json("my post was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

export const getMyFavourites = async (req, res) => {
  try {
    const myFavourites = await pool.query(
      `SELECT title, description, price, postimage, postcode, user_posts.postid, createdat, favourites.usersid FROM user_posts, favourites WHERE (user_posts.postid = favourites.postid) AND (favourites.usersid = $1)`,
      [req.user.id]
    );
    res.status(200).json(myFavourites.rows);
  } catch (error) {
    res.status(500).json({
      error: error,
      success: false,
    });
  }
};

export const countFavourites = async (req, res) => {
  try {
    const pid = req.params.id;
    const counting = await pool.query(
      `SELECT COUNT (postid) FROM favourites WHERE postid = $1`,
      [pid]
    );
    res.status(200).json(counting.rows[0]);
  } catch (error) {
    res.status(500).json({
      error: error,
      success: false,
    });
  }
};
