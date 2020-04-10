import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'j3m-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean;
  public error: string ='';
 

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:  [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      neighborhood: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      password_confirmation: [null,[Validators.pattern]]
    });

  }

  onSubmit(){
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    console.log(this.form.value)
     this.authService.register(this.form.value)
      .pipe(first())
      .subscribe(
          data => {
              // console.log(data);
              
              this.router.navigate(['login']);
          },
          error => {
              this.error = error;
              // this.loading = false;
          });
       
  }

  


}
