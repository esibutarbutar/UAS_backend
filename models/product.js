import { sequelize, DataTypes } from "./model.js";

const Product = sequelize.define("products", {
  images: DataTypes.STRING,
  name: DataTypes.STRING,
  city: DataTypes.STRING,
  alamat: DataTypes.STRING,
  room_id: DataTypes.STRING,
  capacity: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
});

export default Product;
