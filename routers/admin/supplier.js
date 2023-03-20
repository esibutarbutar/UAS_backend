import express from "express";
import Supplier from "../../models/supplier.js";

const router = express.Router();

// syarat biar gbs asal nambah data kosong
const syaratSupplier = (req, res, next) => {
  if (
    req.body.supplier_name.trim() == "" ||
    req.body.contact_name.trim() == "" ||
    req.body.email.trim() == "" ||
    req.body.phone.trim() == "" ||
    (req.body.active != 0 && req.body.active != 1) ||
    isNaN(req.body.active)
  ) {
    console.log("Data tidak sesuai format");
    res.json({ status: 400 });
  } else {
    next();
  }
};

router.get("/", (req, res) => {
  Supplier.findAll().then((results) => {
    res.render("admin/supplier/index", {
      suppliers: results,
      user: req.session.user || "",
    });
  });
});

router.get("/create", (req, res) => {
  res.render("admin/supplier/create", { user: req.session.user });
});

router.get("/edit/:id", (req, res) => {
  Supplier.findOne({ where: { id: req.params.id } }).then((results) => {
    res.render("admin/supplier/edit", {
      supplier: results,
      user: req.session.user,
    });
  });
});

router.post("/api/supplier", syaratSupplier, (req, res, next) => {
  Supplier.create({
    supplier_name: req.body.supplier_name,
    contact_name: req.body.contact_name,
    email: req.body.email,
    phone: req.body.phone,
    active: req.body.active,
    createdBy: req.session.user.username,
  })
    .then((results) => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 502, error: err });
    });
});

router.put("/api/supplier/:id", syaratSupplier, (req, res, next) => {
  Supplier.update(
    {
      supplier_name: req.body.supplier_name,
      contact_name: req.body.contact_name,
      email: req.body.email,
      phone: req.body.phone,
      active: req.body.active,
      updatedBy: req.session.user.username,
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

router.delete("/api/supplier/:id", (req, res) => {
  Supplier.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.json({ status: 200, error: null, Response: results });
    })
    .catch((err) => {
      res.json({ status: 500, error: err, Response: {} });
    });
});

export default router;
