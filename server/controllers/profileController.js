import pool from "../dbConfig.js";

export const getAllProfiles = async (req, res) => {
  try {
    const users =
      // email , name , avatar , username
      await pool.query(
        `SELECT * FROM profiles , users WHERE profiles.userid = users.id`
      );
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "server failed",
    });
  }
};

export const viewProfile = (req, res) => {
  console.log("req.user", req.user);
  const userid = req.user.id;
  console.log("user", userid);
  const { username, avatar } = req.body;
  pool.query(
    `INSERT INTO profiles (username, avatar, userid) VALUES ($1,$2,$3);`,
    [username, avatar, userid],
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
