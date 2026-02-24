const express = require('express');
const router = express.Router();
const Student = require('../models/student.model');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD student
router.post('/', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.json({ message: "Student Deleted Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
