const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all employees
router.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add an employee
router.post("/employees", (req, res) => {
    const { name, position, salary } = req.body;
    db.query("INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)",
        [name, position, salary], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Employee added successfully!" });
        }
    );
});

// Delete an employee
router.delete("/employees/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Employee deleted successfully!" });
    });
});

module.exports = router;
