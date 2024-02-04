import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(["/"]);
    }
  }

  login(username?: string, password?: string) {
    if (!username || !password) {
      console.error("Username and password are required");
      return;
    }

    this.usersService.login(username, password).subscribe({
      next: (data: any) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        this.router.navigate(["/"]);
      },
      error: (error: any) => {
        console.error("Error: ", error);
      }
    });
  }
}
