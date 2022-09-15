const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Like = db.define(
  "Like",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    like_for: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    like_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    like_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: false,
    timestamps: true,
  }
);

module.exports = Like;
