import sequelize from "../dbConfig.js";
import { DataTypes } from "sequelize";

const Posts = sequelize.define(
  "Posts",
  // Model attributes are defined here
  {
    postid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postimage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    postcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Other model options go here
  }

  // INSERT INTO Posts (userName, title, description, postimage)
  // VALUES ('Sborg', '1kg of fresh oranges', 'Fresh oranges bought from LebensmittelLand this week but I will not be using all of them', 'https://thumbs.dreamstime.com/b/cotton-reusable-bag-fresh-oranges-fresh-oranges-reusable-string-bag-grey-stone-background-zero-waste-grocery-shopping-150303344.jpg');
);

export default Posts;
