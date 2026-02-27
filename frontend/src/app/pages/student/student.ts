import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class StudentComponent {

  // Student List
  students: any[] = [
    { id: 1, name: 'Rahul Patel', course: 'BCA', year: '3rd Year', attendance: 85, fees: 'Paid' },
    { id: 2, name: 'Priya Shah', course: 'BBA', year: '2nd Year', attendance: 78, fees: 'Pending' }
  ];

  // Modal control
  showModal = false;
  isEdit = false;

  currentStudent: any = this.emptyStudent();

  // ----------------------
  // OPEN ADD FORM
  // ----------------------
  openAdd() {
    this.isEdit = false;
    this.currentStudent = this.emptyStudent();
    this.showModal = true;
  }

  // ----------------------
  // SAVE STUDENT
  // ----------------------
  saveStudent() {

    if (!this.currentStudent.name) {
      alert("Name required");
      return;
    }

    if (this.isEdit) {
      // update
      const index = this.students.findIndex(s => s.id === this.currentStudent.id);
      this.students[index] = this.currentStudent;
    } else {
      // add new
      this.currentStudent.id = this.students.length + 1;
      this.students.push({ ...this.currentStudent });
    }

    this.showModal = false;
  }

  // ----------------------
  // DELETE
  // ----------------------
  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
  }

  // ----------------------
  // EDIT
  // ----------------------
  editStudent(student: any) {
    this.isEdit = true;
    this.currentStudent = { ...student };
    this.showModal = true;
  }

  // ----------------------
  // EMPTY STUDENT
  // ----------------------
  emptyStudent() {
    return {
      id: 0,
      name: '',
      course: '',
      year: '',
      attendance: 0,
      fees: ''
    };
  }
}