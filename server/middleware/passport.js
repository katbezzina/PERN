import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv";
import passport from "passport";
import pool from "../dbConfig.js";

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  try {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1;`, [
      jwt_payload.email,
    ]);
    const user = res.rows[0];
    console.log("user", user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

export const passportConfig = () => {
  passport.use(jwtStrategy);
};

export const jwtAuth = passport.authenticate("jwt", { session: false });
// export const oAuth = passport.authenticate("oauth", { session: false });
