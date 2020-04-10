import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'j3m-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public error = '';
  public returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.route.queryParamMap.subscribe(
      data => this.returnUrl = data.get('returnUrl')
    );
    // reset login status
    this.reLogout();

  }


  onSubmit() {
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    // console.log(this.form.value)
    this.authService.login(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          this.error = error;
          // this.loading = false;
        });

  }

  reLogout() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.authService.logout().subscribe(
        res => console.log(res)
      );
    }

  }
}
