import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  statuses = ['stable', 'critical', 'finished'];
  forbiddenNames = ['Test', 'Demo']
  form: FormGroup;

  data = {
    name: '',
    email: '',
    status: ''
  }

  ngOnInit() {
    this.form = new FormGroup({
      "name": new FormControl(null, [Validators.required, this.nameValidate.bind(this)]),
      "email": new FormControl(null, [Validators.required, Validators.email], this.emailValidate),
      "status": new FormControl('stable', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.form);

    this.data.name = this.form.get('name').value;
    this.data.email = this.form.get('email').value;
    this.data.status = this.form.get('status').value;
    console.log(this.data);
    this.form.reset()
  }

  nameValidate(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { "nameIsForbidden": true }
    }
    return null;
  }

  emailValidate(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "a@b.c") {
          resolve({ "emailIsForbidden": true });
        }
        resolve(null);
      }, 1500);
    })
    return promise;
  }

}
