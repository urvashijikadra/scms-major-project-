import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class StudentComponent implements OnInit {

  students: any[] = [];

  newStudent = {
    name: '',
    email: '',
    course: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStudents();
  }

  // ✅ LOAD STUDENTS
  loadStudents() {
    this.api.getStudents().subscribe({
      next: (res: any) => {
        // remove blank students if any
        this.students = res.filter(
          (s: any) => s.name || s.email || s.course
        );
      },
      error: (err: any) => console.error(err)
    });
  }

  // ✅ ADD STUDENT WITH VALIDATION
  addStudent() {

    if (!this.newStudent.name || !this.newStudent.email || !this.newStudent.course) {
      alert("Please fill all fields ❌");
      return;
    }

    this.api.addStudent(this.newStudent).subscribe({
      next: () => {
        alert('Student Added ✅');
        this.newStudent = { name: '', email: '', course: '' };
        this.loadStudents();
      },
      error: (err: any) => console.error(err)
    });
  }

  // ✅ DELETE STUDENT
  deleteStudent(id: string) {
    if (confirm('Delete student?')) {
      this.api.deleteStudent(id).subscribe({
        next: () => {
          alert('Student Deleted ❌');
          this.loadStudents();
        },
        error: (err: any) => console.error(err)
      });
    }
  }
}