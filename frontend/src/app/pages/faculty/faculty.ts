import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faculty.html',
  styleUrls: ['./faculty.css']
})
export class Faculty {

  // Faculty List
  facultyList: any[] = [
    { id: 1, name: 'Dr. Mehta', subject: 'Maths', experience: '5 Years', email: 'mehta@mail.com' },
    { id: 2, name: 'Prof. Shah', subject: 'Physics', experience: '8 Years', email: 'shah@mail.com' }
  ];

  showModal = false;
  isEdit = false;

  faculty: any = this.emptyFaculty();

  // ----------------------
  // EMPTY FACULTY
  // ----------------------
  emptyFaculty(){
    return { id: 0, name:'', subject:'', experience:'', email:'' };
  }

  // ----------------------
  // OPEN ADD
  // ----------------------
  openAdd(){
    this.isEdit = false;
    this.faculty = this.emptyFaculty();
    this.showModal = true;
  }

  // ----------------------
  // OPEN EDIT
  // ----------------------
  openEdit(f:any){
    this.isEdit = true;
    this.faculty = {...f};
    this.showModal = true;
  }

  // ----------------------
  // SAVE FACULTY
  // ----------------------
  save(){

    if(!this.faculty.name){
      alert("Name required");
      return;
    }

    if(this.isEdit){
      // UPDATE
      let i = this.facultyList.findIndex(x=>x.id===this.faculty.id);
      this.facultyList[i] = this.faculty;
    }else{
      // ADD NEW (SEQUENCE ID)
      this.faculty.id = this.facultyList.length > 0
        ? Math.max(...this.facultyList.map(x => x.id)) + 1
        : 1;

      this.facultyList.push({ ...this.faculty });
    }

    this.showModal = false;
  }

  // ----------------------
  // DELETE
  // ----------------------
  delete(id:number){
    this.facultyList = this.facultyList.filter(x=>x.id!==id);
  }
}