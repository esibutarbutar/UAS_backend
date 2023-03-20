import { sequelize, DataTypes } from "./model.js";

const Pesan = sequelize.define("pesans", {
  name: DataTypes.STRING,
  city: DataTypes.STRING,
  alamat: DataTypes.STRING,
  room_id: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
});

export default Pesan;
