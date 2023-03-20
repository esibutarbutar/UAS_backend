import express from "express";
import Product from "../../models/product.js";

const router = express.Router();

// syarat biar gbs asal nambah data kosong
const syaratProduct = (req, res, next) => {
  if (
    req.body.price <= 0 ||
    isNaN(req.body.price) ||
    req.body.name.trim() == ""
  ) {
    console.log("Data tidak sesuai format");
    res.json({ status: 400 });
  } else {
    next();
  }
};

router.get("/", (req, res) => {
  Product.findAll().then((results) => {
    res.render("admin/product/index", {
      products: results,
      user: req.session.user || "",
    });
  });
});

router.get("/create", (req, res) => {
  res.render("admin/product/create", { user: req.session.user || "" });
});

router.get("/edit/:id", (req, res) => {
  Product.findOne({ where: { id: req.params.id } }).then((results) => {
    res.render("admin/product/edit", {
      product: results,
      user: req.session.user || "",
    });
  });
});
router.get("/cari/:nama", (req, res) => {
  Product.filtered({ where: { nama: req.params.nama } }).then((results) => {
    res.render("admin/product/index", {
      product: results,
      user: req.session.user || "",
    });
  });
});
router.post("/api/products", syaratProduct, (req, res) => {
  Product.create({
    images: req.body.images,
    name: req.body.name,
    city: req.body.city,
    alamat: req.body.alamat,
    room_id: req.body.room_id,
    capacity: req.body.capacity,
    price: req.body.price,
  })
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

router.put("/api/product/:id", syaratProduct, (req, res) => {
  Product.update(
    {
      images: req.body.images,
      name: req.body.name,
      city: req.body.city,
      alamat: req.body.alamat,
      room_id: req.body.room_id,
      capacity: req.body.capacity,
      price: req.body.price,
    },
    { where: { id: req.params.id } }
  )
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

router.delete("/api/product/:id", (req, res) => {
  Product.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 500, error: err, Response: {} });
    });
});

export default router;
