import express from "express";
import Pesan from "../../models/pesan.js";

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
  Pesan.findAll().then((results) => {
    res.render("admin/pesan/index", {
      pesan: results,
      user: req.session.user || "",
    });
  });
});

router.get("/create", (req, res) => {
  res.render("admin/pesan/create", { user: req.session.user || "" });
});

router.get("/edit/:id", (req, res) => {
  Pesan.findOne({ where: { id: req.params.id } }).then((results) => {
    res.render("admin/pesan/edit", {
      pesan: results,
      user: req.session.user || "",
    });
  });
});
router.get("/cari/:nama", (req, res) => {
  Pesan.filtered({ where: { nama: req.params.nama } }).then((results) => {
    res.render("admin/pesan/index", {
      pesan: results,
      user: req.session.user || "",
    });
  });
});
router.post("/api/pesan", syaratProduct, (req, res) => {
  Pesan.create({
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

router.put("/api/pesan/:id", syaratProduct, (req, res) => {
  Pesan.update(
    {
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

router.delete("/api/pesan/:id", (req, res) => {
  Pesan.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 500, error: err, Response: {} });
    });
});

export default router;
