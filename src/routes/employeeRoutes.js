const express = require("express");
const db = require("../config/db");

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
    const { id, name, position, age, address, email, phone, salary } = req.body;
    db.query("INSERT INTO employees (id, name, position, age, address, email, phone, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [id, name, position, age, address, email, phone, salary], (err, result) => {
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

// Update an employee
router.put("/employees/:id", (req, res) => {
    const { id } = req.params;
    const { name, position, age, address, email, phone, salary } = req.body;
    db.query("UPDATE employees SET name = ?, position = ?, age = ?, address = ?, email = ?, phone = ?, salary = ? WHERE id = ?",
        [name, position, age, address, email, phone, salary, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Employee updated successfully!" });
        }
    );
});

module.exports = router;
