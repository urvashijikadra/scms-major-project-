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
    console.log('Received student data:', req.body);
    
    // Validate required fields
    if (!req.body.name || req.body.name.trim() === '') {
      return res.status(400).json({ message: 'Student name is required' });
    }
    
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ message: err.message || 'Error adding student' });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student Deleted Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE student
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student Updated Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
