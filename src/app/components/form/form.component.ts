import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  signupForm: FormGroup;

  constructor() {
    this.signupForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-z]+$/i),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      { validators: isNotMatched }
    );
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  onSubmitForm() {
    if (this.signupForm.invalid) return;
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }
}

const isNotMatched: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pwd = control.get('password')?.value;
  const cPwd = control.get('confirmPassword')?.value;

  return pwd && cPwd && pwd !== cPwd ? { isNotMatched: true } : null;
};
