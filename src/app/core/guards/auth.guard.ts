import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  canActivate(): boolean {
    return this.checkUser();
  }

  canLoad(): boolean {
    return this.checkUser();
  }

  private checkUser(): boolean {
    const loginUser = this.userService.getUserFromLocalStorage();
    if (loginUser && loginUser.id !== 0){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
