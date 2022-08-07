const { DataTypes } = require("sequelize");
const db = require("../db");

const Auth = db.define(
  "auth",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notifcation_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: false,
    timestamps: true,
  }
);

module.exports = Auth;
