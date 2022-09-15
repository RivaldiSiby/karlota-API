const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Contact = db.define(
  "Contact",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    add_contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_with: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    have_contact: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: false,
    timestamps: true,
  }
);

module.exports = Contact;
