import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { UserFormValidator } from 'src/app/shared/validators/user-form.validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public userForm: FormGroup;
  private users: string[];
  public newUser: User;
  private defaultAvatar = 'https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelBlue&clotheType=Hoodie&eyeType=Happy&eyebrowType=Default&facialHairType=Blank&hairColor=Brown&mouthType=Smile&skinColor=Light&topType=WinterHat4'

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeUserForm();
    this.userService.getAll().subscribe(users => {
      this.users = users.map(x => x.username);
      this.initializeUserForm();
    });
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.mapUser(this.userForm.value);
      this.userService.add(this.newUser).subscribe(user => {
        this.initializeUserForm();
        alert(user.fullName + ' has been registered successfully.');
        this.router.navigate(['/login']);
      });
    }
  }

  private initializeUserForm(): void {
    this.userForm = new FormGroup({
      imgUrl: new FormControl(this.defaultAvatar, [Validators.required]),
      fullName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15),
        UserFormValidator.validUsername, UserFormValidator.uniqueUsername(this.users)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(255)]),
      mobileNumber: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11),
        UserFormValidator.validMobileNumber]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(128)])
    },
      {
        validators: UserFormValidator.passwordsMustMatch('password', 'confirmPassword')
      }
    );
  }

  private mapUser(userValues: any): void {
    this.newUser = {
      id: 0,
      imgUrl: userValues?.imgUrl,
      fullName: userValues?.fullName,
      email: userValues?.email,
      username: userValues?.username,
      mobileNumber: userValues?.mobileNumber,
      password: userValues?.password
    };
  }

}
