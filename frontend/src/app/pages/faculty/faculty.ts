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

  facultyList: any[] = [
    { id: 1, name: 'Dr. Mehta', subject: 'Maths', experience: '5 Years', email: 'mehta@mail.com' },
    { id: 2, name: 'Prof. Shah', subject: 'Physics', experience: '8 Years', email: 'shah@mail.com' }
  ];

  showModal = false;
  isEdit = false;

  faculty: any = this.emptyFaculty();

  emptyFaculty(){
    return { id: null, name:'', subject:'', experience:'', email:'' };
  }

  openAdd(){
    this.isEdit = false;
    this.faculty = this.emptyFaculty();
    this.showModal = true;
  }

  openEdit(f:any){
    this.isEdit = true;
    this.faculty = {...f};
    this.showModal = true;
  }

  save(){
    if(this.isEdit){
      let i = this.facultyList.findIndex(x=>x.id===this.faculty.id);
      this.facultyList[i] = this.faculty;
    }else{
      this.faculty.id = Date.now();
      this.facultyList.push(this.faculty);
    }
    this.showModal = false;
  }

  delete(id:number){
    this.facultyList = this.facultyList.filter(x=>x.id!==id);
  }
}