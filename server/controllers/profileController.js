import pool from "../dbConfig.js";

export const getAllProfiles = async (req, res) => {
  try {
    const users =
      // email , name , avatar , username
      await pool.query(
        `SELECT avatar, username, email, name, userid FROM profiles , users WHERE profiles.userid = users.id`
      );
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "server failed",
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    // console.log("uid", req.userid);
    const profileDetails = await pool.query(
      // `SELECT avatar, username, email, name, userid FROM profiles, users WHERE profiles.userid = $1`,
      `SELECT avatar, username, name, email FROM profiles FULL OUTER JOIN users ON users.id = profiles.userid where userid = $1`,
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

export const postToProfile = (req, res) => {
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
