const express = require('express');
const router = express.Router();
const Employee = require('../Models/employee');

// GET ALL EMPLOYEES
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET EMPLOYEE BY ID
router.get('/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    res.status(200).json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD EMPLOYEE
router.post('/', async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE EMPLOYEE
router.put('/:id', async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE EMPLOYEE
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
