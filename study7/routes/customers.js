var express = require("express");
var router = express.Router();
const connectionPool = require("../database/connectionPool");
const CustomerRepository = require("../database/CustomerRepository");

const repository = new CustomerRepository(connectionPool);

// GET /customers
router.get("/", function (req, res) {
    repository.getAll((err, result) => {
        err
            ? res.status(500).json({ error: err.toString() })
            : res.status(200).json(result);
    });
});

// GET /customers/:id
router.get("/:id", function (req, res) {
    repository.get(req.params.id, (err, result) => {
        err
            ? res.status(500).json({ error: err.toString() })
            : res.status(200).json(result);
    });
});

// PUT /customers/:id
router.put("/:id", function (req, res) {
    repository.update(req.params.id, req.body, (err) => {
        err
            ? res.status(500).json({ error: err.toString() })
            : res.sendStatus(200);
    });
});

// DELETE /customers/:id
router.delete("/:id", function (req, res) {
    repository.delete(req.params.id, (err) => {
        err
            ? res.status(500).json({ error: err.toString() })
            : res.sendStatus(200);
    });
});

// POST /customers
router.post("/", function (req, res) {
    repository.save(req.body, (err) => {
        err
            ? res.status(500).json({ error: err.toString() })
            : res.sendStatus(200);
    });
});

module.exports = router;