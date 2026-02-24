const express = require('express');
const router = express.Router();
const Student = require('../models/student.model');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD student
router.post('/', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const saved = await newStudent.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ DELETE student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student Deleted Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", updateStudent);

module.exports = router;
