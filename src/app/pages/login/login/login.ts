import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private router: Router) { }

  navigateToManager(): void {
    this.router.navigate(['/manager']);
  }

  navigateToForeman(): void {
    this.router.navigate(['/foreman']);
  }

}
