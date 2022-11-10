import sequelize from "../dbClient.js";
import { DataTypes } from "sequelize";

const Post = sequelize.define(
  "Post",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

export default Post;
