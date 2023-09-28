import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

const USERNAME_REGEX = new RegExp(/^[a-zA-Z0-9_]+$/);
const MOBILENUMBER_REGEX = new RegExp(/^09[0-9]{9}$/);

export class UserFormValidator {
    public static uniqueUsername(usernames: string[]): ValidatorFn {
        return(control: AbstractControl): { uniqueError: boolean } => {
            if (control && control.value){
                const username = control.value;
                const uniqueError = { uniqueError: true };
                if (usernames.includes(username)) {
                    return uniqueError;
                }
                return null;
            }
        };
    }

    public static validUsername(control: AbstractControl): { validUsernameError: boolean } {
        if (control && control.value){
            const username = control.value;
            const validUsernameError = { validUsernameError: true };

            if (!USERNAME_REGEX.test(username)) {
                return validUsernameError;
            }
            return null;
        }
    }

    public static validMobileNumber(control: AbstractControl): {validMobileError: boolean}{
        if (control && control.value){
            const mobileNumber = control.value;
            const validMobileError = { validMobileError: true };

            if (!MOBILENUMBER_REGEX.test(mobileNumber)) {
                return validMobileError;
            }
            return null;
        }
    }

    public static passwordsMustMatch(password: string, confirmPassword: string): ValidatorFn {
        return(formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];
            if (passwordControl
                && passwordControl.value
                && confirmPasswordControl
                && confirmPasswordControl.value){
                const passwordMismatchError = { passwordMismatchError: true };
                if (passwordControl.value !== confirmPasswordControl.value) {
                    confirmPasswordControl.setErrors(passwordMismatchError);
                }
                else {
                    confirmPasswordControl.setErrors(null);
                }
            }
            return null;
        };
    }
}
