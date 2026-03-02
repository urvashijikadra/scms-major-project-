import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notice.html',
  styleUrls: ['./notice.css']
})
export class Notice {

  notices: any[] = [
    {
      id: 1,
      title: 'Exam Schedule Released',
      description: 'Final exam timetable has been published. Please check the notice board for details.',
      date: new Date().toISOString().split('T')[0],
      important: true
    }
  ];

  filteredNotices: any[] = [];
  searchTerm: string = '';
  
  showModal = false;
  isEdit = false;
  
  // Delete confirmation
  showDeleteModal = false;
  noticeToDelete: any = null;

  currentNotice: any = this.emptyNotice();

  constructor() {
    this.filteredNotices = [...this.notices];
    this.sortByDate();
  }

  // ----------------------
  // EMPTY NOTICE
  // ----------------------
  emptyNotice() {
    return {
      id: 0,
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      important: false
    };
  }

  // ----------------------
  // OPEN ADD
  // ----------------------
  openAdd() {
    this.isEdit = false;
    this.currentNotice = this.emptyNotice();
    this.showModal = true;
  }

  // ----------------------
  // OPEN EDIT
  // ----------------------
  openEdit(notice: any) {
    this.isEdit = true;
    this.currentNotice = { ...notice };
    this.showModal = true;
  }

  // ----------------------
  // SAVE NOTICE
  // ----------------------
  saveNotice() {

    if (!this.currentNotice.title || this.currentNotice.title.trim() === '') {
      alert("Title is required");
      return;
    }

    if (this.isEdit) {
      const index = this.notices.findIndex(n => n.id === this.currentNotice.id);
      if (index !== -1) {
        this.notices[index] = { ...this.currentNotice };
      }
    } else {
      this.currentNotice.id = this.notices.length > 0
        ? Math.max(...this.notices.map(n => n.id)) + 1
        : 1;

      this.notices.push({ ...this.currentNotice });
    }

    this.sortByDate();
    this.filterNotices();
    this.showModal = false;
  }

  // ----------------------
  // CONFIRM DELETE
  // ----------------------
  confirmDelete(notice: any) {
    this.noticeToDelete = notice;
    this.showDeleteModal = true;
  }

  // ----------------------
  // DELETE NOTICE
  // ----------------------
  deleteNotice() {
    if (this.noticeToDelete) {
      this.notices = this.notices.filter(n => n.id !== this.noticeToDelete.id);
      this.filterNotices();
      this.noticeToDelete = null;
    }
    this.showDeleteModal = false;
  }

  // ----------------------
  // FILTER NOTICES (Search)
  // ----------------------
  filterNotices() {
    if (!this.searchTerm.trim()) {
      this.filteredNotices = [...this.notices];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredNotices = this.notices.filter(n => 
        n.title.toLowerCase().includes(term) || 
        n.description.toLowerCase().includes(term)
      );
    }
    this.sortByDate();
  }

  // ----------------------
  // SORT DATE (Latest First)
  // ----------------------
  sortByDate() {
    this.notices.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.filteredNotices.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  // ----------------------
  // FORMAT DATE
  // ----------------------
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }

  // ----------------------
  // CLOSE MODAL ON OVERLAY CLICK
  // ----------------------
  closeModalOnOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.showModal = false;
    }
  }
}
