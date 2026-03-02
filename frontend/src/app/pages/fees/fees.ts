import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fees.html',
  styleUrls: ['./fees.css']
})
export class Fees {

  // Student List - In real app, this would come from API
  students = [
    { id: 1, name: 'Rahul Patel' },
    { id: 2, name: 'Priya Shah' },
    { id: 3, name: 'Amit Joshi' }
  ];

  // Payment mode options
  paymentModes = ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Online Payment'];

  // Fees records - Load from localStorage if available
  feesList: any[] = this.loadFees();

  showModal = false;
  isEdit = false;
  errorMessage = '';

  currentFee: any = this.emptyFee();

  // Load fees from localStorage
  private loadFees(): any[] {
    const stored = localStorage.getItem('feesList');
    return stored ? JSON.parse(stored) : [];
  }

  // Save fees to localStorage
  private saveFees(): void {
    localStorage.setItem('feesList', JSON.stringify(this.feesList));
  }

  // Generate receipt number
  generateReceiptNo(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `RCP-${year}${month}-${random}`;
  }

  emptyFee() {
    return {
      id: 0,
      studentId: 0,
      studentName: '',
      receiptNo: '',
      total: 0,
      paid: 0,
      pending: 0,
      status: '',
      paymentMode: '',
      remarks: '',
      date: new Date().toISOString().split('T')[0]
    };
  }

  openAdd() {
    this.isEdit = false;
    this.currentFee = this.emptyFee();
    this.currentFee.receiptNo = this.generateReceiptNo();
    this.errorMessage = '';
    this.showModal = true;
  }

  openEdit(fee: any) {
    this.isEdit = true;
    this.currentFee = { ...fee };
    this.errorMessage = '';
    this.showModal = true;
  }

  calculate() {
    const total = this.currentFee.total || 0;
    const paid = this.currentFee.paid || 0;
    
    this.currentFee.pending = total - paid;

    if (this.currentFee.pending <= 0) {
      this.currentFee.status = 'Paid';
      this.currentFee.pending = 0;
    } else if (paid === 0) {
      this.currentFee.status = 'Not Paid';
    } else {
      this.currentFee.status = 'Partial';
    }
  }

  validateForm(): boolean {
    this.errorMessage = '';

    if (!this.currentFee.studentId || this.currentFee.studentId === 0) {
      this.errorMessage = '⚠️ Please select a student';
      return false;
    }

    if (!this.currentFee.total || this.currentFee.total <= 0) {
      this.errorMessage = '⚠️ Please enter a valid total amount';
      return false;
    }

    if (this.currentFee.paid < 0) {
      this.errorMessage = '⚠️ Paid amount cannot be negative';
      return false;
    }

    if (this.currentFee.paid > this.currentFee.total) {
      this.errorMessage = '⚠️ Paid amount cannot exceed total fees';
      return false;
    }

    if (!this.currentFee.date) {
      this.errorMessage = '⚠️ Please select a date';
      return false;
    }

    if (this.currentFee.paid > 0 && !this.currentFee.paymentMode) {
      this.errorMessage = '⚠️ Please select payment mode';
      return false;
    }

    return true;
  }

  saveFee() {
    // Validate form before saving
    if (!this.validateForm()) {
      return;
    }

    const student = this.students.find(s => s.id == this.currentFee.studentId);
    this.currentFee.studentName = student?.name || 'Unknown';

    this.calculate();

    if (this.isEdit) {
      const index = this.feesList.findIndex(f => f.id === this.currentFee.id);
      if (index !== -1) {
        this.feesList[index] = { ...this.currentFee };
      }
    } else {
      this.currentFee.id = this.feesList.length > 0
        ? Math.max(...this.feesList.map(f => f.id)) + 1
        : 1;

      this.feesList.push({ ...this.currentFee });
    }

    // Save to localStorage
    this.saveFees();

    this.showModal = false;
  }

  deleteFee(id: number) {
    if (confirm('Are you sure you want to delete this fee record?')) {
      this.feesList = this.feesList.filter(f => f.id !== id);
      this.saveFees();
    }
  }

  // Summary
  totalCollection() {
    return this.feesList.reduce((sum, f) => sum + (f.paid || 0), 0);
  }

  totalPending() {
    return this.feesList.reduce((sum, f) => sum + (f.pending || 0), 0);
  }

  // Get student name by ID
  getStudentName(id: number): string {
    const student = this.students.find(s => s.id === id);
    return student?.name || 'Unknown';
  }
}
