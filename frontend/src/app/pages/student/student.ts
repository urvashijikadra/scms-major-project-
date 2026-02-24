import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class StudentComponent implements OnInit {

  students: any[] = [];

  newStudent = { name: '', email: '', course: '' };

  editMode = false;
  editStudentId: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.api.getStudents().subscribe((res: any) => {
      this.students = res;
    });
  }

  // ➕ ADD
  addStudent() {
    if (!this.newStudent.name || !this.newStudent.email || !this.newStudent.course) {
      alert("Fill all fields ❌");
      return;
    }

    this.api.addStudent(this.newStudent).subscribe(() => {
      alert("Student Added ✅");
      this.newStudent = { name: '', email: '', course: '' };
      this.loadStudents();
    });
  }

  // ❌ DELETE
  deleteStudent(id: string) {
    this.api.deleteStudent(id).subscribe(() => {
      alert("Deleted ❌");
      this.loadStudents();
    });
  }

  // ✏️ START EDIT
  startEdit(student: any) {
    this.editMode = true;
    this.editStudentId = student._id;

    this.newStudent = {
      name: student.name,
      email: student.email,
      course: student.course
    };
  }

  // ✅ UPDATE
  updateStudent() {
    if (!this.editStudentId) return;

    this.api.updateStudent(this.editStudentId, this.newStudent)
      .subscribe(() => {
        alert("Student Updated ✅");
        this.editMode = false;
        this.editStudentId = null;
        this.newStudent = { name: '', email: '', course: '' };
        this.loadStudents();
      });
  }

  cancelEdit() {
    this.editMode = false;
    this.newStudent = { name: '', email: '', course: '' };
  }
}