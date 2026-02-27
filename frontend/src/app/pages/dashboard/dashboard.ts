import { Component, AfterViewInit, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  // Dynamic data variables
  totalStudents: number = 0;
  totalFaculty: number = 45;
  totalNotices: number = 12;
  pendingFees: number = 0;
  totalCollected: number = 0;
  totalSyllabus: number = 15;
  
  // Current date
  currentDate: string = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    // Set current date
    this.setCurrentDate();
    
    // Load student data for dynamic stats
    this.loadDashboardData();
  }

  setCurrentDate() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    this.currentDate = now.toLocaleDateString('en-US', options);
  }

  loadDashboardData() {
    this.api.getStudents().subscribe((students: any) => {
      this.totalStudents = students.length;
      
      // Calculate fees from student data
      let totalFees = 0;
      let totalPaid = 0;
      
      students.forEach((student: any) => {
        totalFees += Number(student.fees) || 0;
        totalPaid += Number(student.paid) || 0;
      });
      
      this.pendingFees = totalFees - totalPaid;
      this.totalCollected = totalPaid;
      
      // Update fees chart after data is loaded
      this.updateFeesChart();
    });
  }

  updateFeesChart() {
    const feesChart = Chart.getChart('feesChart');
    if (feesChart) {
      const total = this.pendingFees + this.totalCollected;
      const paidPercent = total > 0 ? (this.totalCollected / total) * 100 : 70;
      const pendingPercent = 100 - paidPercent;
      
      feesChart.data.datasets[0].data = [paidPercent, pendingPercent];
      feesChart.update();
    }
  }

  ngAfterViewInit() {

    new Chart('attendanceChart', {
      type: 'bar',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri'],
        datasets: [{
          label: 'Attendance %',
          data: [85, 90, 78, 88, 92],
          backgroundColor: '#4facfe'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: 'white',
              stepSize: 20
            },
            grid: {
              color: 'rgba(255,255,255,0.05)'
            }
          },
          x: {
            ticks: {
              color: 'white'
            },
            grid: {
              color: 'rgba(255,255,255,0.05)'
            }
          }
        }
      }
    });

    new Chart('feesChart', {
      type: 'pie',
      data: {
        labels: ['Paid','Pending'],
        datasets: [{
          data: [70, 30],
          backgroundColor: ['#43e97b','#ff5e62']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'white'
            }
          }
        }
      }
    });

  }
}
