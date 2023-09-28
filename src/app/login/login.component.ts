import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { UserLogin } from '../shared/models/user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UserLogin;
  public showLoginError = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new UserLogin();
    this.checkIfIsUserLoggedIn();
  }

  public checkIfIsUserLoggedIn(): void {
    const isUserLoggedIn = this.userService.getUserFromLocalStorage()?.id !== 0;
    if (isUserLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  public onSubmit(): void {
    const param = {
      username: this.user.username,
      password: this.user.password
    };

    this.userService.get(param).subscribe(userResult => {
      if (userResult[0] && userResult[0].username === this.user.username) {
        this.showLoginError = false;
        localStorage.setItem('user', JSON.stringify(userResult[0]));
        this.router.navigate(['/home']);
      }
      else {
        this.showLoginError = true;
      }
    });
  }
}
