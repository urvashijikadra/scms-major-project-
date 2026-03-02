import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.css']
})
export class Attendance {

  // Sample Student List (later backend thi aavse)
  students = [
    { id: 1, name: 'Rahul Patel' },
    { id: 2, name: 'Priya Shah' },
    { id: 3, name: 'Amit Joshi' }
  ];

  selectedStudentId: number = 0;
  selectedDate: string = new Date().toISOString().split('T')[0];
  status: string = 'Present';

  attendanceRecords: any[] = [];

  // ----------------------
  // MARK ATTENDANCE
  // ----------------------
  markAttendance() {

    if (!this.selectedStudentId || this.selectedStudentId === 0) {
      alert("Please select a student");
      return;
    }

    if (!this.selectedDate) {
      alert("Please select a date");
      return;
    }

    // Check if attendance already marked for this student on this date
    const existingRecord = this.attendanceRecords.find(
      r => r.studentId === this.selectedStudentId && r.date === this.selectedDate
    );

    if (existingRecord) {
      // Update existing record
      existingRecord.status = this.status;
      alert("Attendance updated successfully!");
    } else {
      // Add new record
      const student = this.students.find(s => s.id == this.selectedStudentId);
      this.attendanceRecords.push({
        studentId: student?.id,
        studentName: student?.name,
        date: this.selectedDate,
        status: this.status
      });
      alert("Attendance marked successfully!");
    }
  }

  // ----------------------
  // CALCULATE PERCENTAGE
  // ----------------------
  getPercentage(studentId: number): number {

    const records = this.attendanceRecords.filter(r => r.studentId === studentId);

    if (records.length === 0) return 0;

    const presentCount = records.filter(r => r.status === 'Present').length;

    return parseFloat(((presentCount / records.length) * 100).toFixed(2));
  }

  // ----------------------
  // MONTHLY REPORT
  // ----------------------
  getMonthlyReport(studentId: number, month: string) {

    return this.attendanceRecords.filter(r =>
      r.studentId === studentId &&
      r.date.startsWith(month)
    );
  }

  // ----------------------
  // DELETE RECORD
  // ----------------------
  deleteRecord(index: number) {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      this.attendanceRecords.splice(index, 1);
    }
  }

  // ----------------------
  // GET TOTAL PRESENT
  // ----------------------
  getTotalPresent(studentId: number): number {
    return this.attendanceRecords.filter(
      r => r.studentId === studentId && r.status === 'Present'
    ).length;
  }

  // ----------------------
  // GET TOTAL ABSENT
  // ----------------------
  getTotalAbsent(studentId: number): number {
    return this.attendanceRecords.filter(
      r => r.studentId === studentId && r.status === 'Absent'
    ).length;
  }

  // ----------------------
  // GET TOTAL CLASSES
  // ----------------------
  getTotalClasses(studentId: number): number {
    return this.attendanceRecords.filter(r => r.studentId === studentId).length;
  }
}
