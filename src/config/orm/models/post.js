const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Post = db.define(
  "post",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: false,
    timestamps: true,
  }
);

module.exports = Post;
