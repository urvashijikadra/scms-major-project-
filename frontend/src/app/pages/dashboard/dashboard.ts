import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  template: `<h2>Check Console</h2>`
})
export class DashboardComponent implements OnInit {

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getStudents().subscribe({
      next: (res:any) => console.log(res),
      error: (err:any) => console.error(err)
    });
  }
}
