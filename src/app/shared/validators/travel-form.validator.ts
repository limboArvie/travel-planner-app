import { AbstractControl } from '@angular/forms';

const DATE_REGEX = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/);
const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

export class TravelFormValidator {
    public static validDate(control: AbstractControl): { dateError: boolean } {
        if (control && control.value) {
            const dateStr = control.value;
            const invalidDate = { dateError: true };

            // Invalid format
            if (!DATE_REGEX.test(dateStr)) {
                return invalidDate;
            }

            const dateInput = dateStr.split('-');
            const month = parseInt(dateInput[1], 10);
            const day = parseInt(dateInput[2], 10);
            const year = parseInt(dateInput[0], 10);

            // Leap Year
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                monthLength[1] = 29;
            }

            if (!(day > 0 && day <= monthLength[month - 1])) {
                return invalidDate;
            }

            return null;
        }
    }

    public static pastDate(control: AbstractControl): { pastDateError: boolean } {
        if (control && control.value) {
            const inputDate = new Date(control.value);
            const dateNow = new Date();
            inputDate.setHours(0, 0, 0, 0);
            dateNow.setHours(0, 0, 0, 0);
            const pastDate = { pastDateError: true };

            if (inputDate < dateNow ){
                return pastDate;
            }
            return null;
        }
    }
}
