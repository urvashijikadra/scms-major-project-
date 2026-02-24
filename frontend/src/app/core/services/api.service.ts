import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private baseUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getStudents(){
    return this.http.get(this.baseUrl);
  }

  addStudent(data:any){
    return this.http.post(this.baseUrl, data);
  }

  // ✅ ADD THIS
  deleteStudent(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
updateStudent(id: string, data: any){
  return this.http.put(`${this.baseUrl}/${id}`, data);
}
}