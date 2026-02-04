const express = require('express');
const router = express.Router();
const Employee = require('../Models/employee');

// HOME → GET ALL EMPLOYEES
router.get('/', async (req, res) => {
  try {
    const users = await Employee.find();
    res.render('home', { employees: users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Employee", error });
  }
});

// ADD PAGE
router.get('/add', (req, res) => {
  res.render('add');
});

// POST → ADD EMPLOYEE
router.post('/add', async (req, res) => {
  try {
    await Employee.create(req.body);
    res.redirect('/employee');
  } catch (error) {
    res.status(500).json({ message: "Error creating Employee", error });
  }
});

// EDIT PAGE
router.get('/edit/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    res.render('edit', { emp });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Employee", error });
  }
});

// PUT → UPDATE EMPLOYEE
router.put('/update/:id', async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/employee');
  } catch (error) {
    res.status(500).json({ message: "Error updating Employee", error });
  }
});

// DELETE → REMOVE EMPLOYEE
router.delete('/delete/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/employee');
  } catch (error) {
    res.status(500).json({ message: "Error deleting Employee", error });
  }
});

module.exports = router;
