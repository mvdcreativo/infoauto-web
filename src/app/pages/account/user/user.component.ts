import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { NgSwitch } from '@angular/common';
import { User } from 'src/app/modules/users/interfaces/user';
import { UserService } from 'src/app/modules/users/services/user.service';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  formAdd: FormGroup;
  formPass: FormGroup;
  currenUser: User;
  readOnly: boolean = true;
  edit: boolean = false;
  mostrar: boolean = false;
  typeUser: any;
  checked: boolean= false
  


  constructor(
    private _authSerice: AuthService,
    private _userService: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const user_id = this._authSerice.currentUserValue.user.id
    console.log(user_id);
    
    this._authSerice.findUser(user_id).subscribe(
      user => {
        console.log(user);
        
        this.currenUser = user
        this.createForm();
        this.getTypeUser(user.role)
        this.edit= false
      }
    )
  }

  createForm() {
    this.formAdd = this.fb.group({
      name: this.currenUser.name,
      email: [{value : this.currenUser.email, disabled: true }],
      address: this.currenUser.address,
      city: this.currenUser.city_id,
      phone: this.currenUser.phone,
      ci: this.currenUser.ci,
      rut: this.currenUser.rut,
      company: this.currenUser.company,
      discount: this.currenUser.discount,
      role:this.currenUser.role,
      password:[null],
      newPassword:[null],
      newPasswordConfirm:[null]

    })


    this.formPass = this.fb.group({
      password:[null, Validators.required],
      passwordConfirm:[null, Validators.required]

    },{
      validator: this.passwordConfirming
    })
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordConfirm').value) {
        return {invalid: true};
    }
  }

  update(id: number) {
    const data = this.formAdd.value;

    this._userService.updateUser(id, data).subscribe(
      res => {
        console.log(res);
        this.openSnackBar('success', `Tipo ${res.name} Actualizado con éxito!!`)
        this.formAdd.reset();
        this.checked= false
        this.getUser()
        

      },
      err => {
        console.log(err);

        this.openSnackBar('error', `${err}`)
      },
    )
  }

  updatePass(id: number){
    const data = this.formPass.value;

    this._userService.updateUser(id, data).subscribe(
      res => {
        console.log(res);
        this.openSnackBar('success', `Tipo ${res.name} Actualizado con éxito!!`)
        this.formAdd.reset();
        this.checked= false
        this.getUser()
        

      },
      err => {
        console.log(err);

        this.openSnackBar('error', `${err}`)
      },
    )
  }

  getTypeUser(typeUser) {
    console.log();
    
    switch (typeUser) {
      case "ADM": this.typeUser = "Administrador"
        break;
      case "MAY": this.typeUser = "Mayorista"
        break;
      case "SADM": this.typeUser = "Super Administrador"
        break;

      default: this.typeUser = "Usuario"
        break;
    }

    
  }

  changeEdit(){
 
    this.checked =  !this.checked 
    console.log(this.checked);
      this.edit = !this.edit;
      // this.checked = !this.edit
   
  }

  oculta(estado) {
    this.edit = false;
    this.formAdd.reset();
    this.mostrar = estado
  }






  openSnackBar(estadoRes, message: string) {
    let classToast: string;
    switch (estadoRes) {
      case "success":
        classToast = "toastSuccess"
        break;
      case "warn":
        classToast = "toastWarn"
        break;
      case "error":
        classToast = "toastError"
        break;

      default:
        classToast = "toastError"
        break;
    }

    const durationSeconds = 5;
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: [classToast],
      verticalPosition: 'top',
      duration: durationSeconds * 1000,
    });
  }
}