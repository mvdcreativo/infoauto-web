import { Component, OnInit } from '@angular/core';
import { SettingApiService } from '../services/setting-api.service';
import { VehicleCategory } from 'src/app/interfaces/resultado';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './tipo-vehicle.component.html',
  styleUrls: ['./tipo-vehicle.component.scss']
})
export class TipoVehicleComponent implements OnInit {
  tipe_vehicle: VehicleCategory[];
  displayedColumns: string[] = ['id', 'name', 'acciones'];
  dataSource: any;

  formAdd: FormGroup
  mostrar: boolean = false;
  edit: boolean;
  idUpdate: number = null;


  constructor(
    private _settingsService: SettingApiService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();
  }

  createForm() {
    this.formAdd = this.fb.group({
      name: [null, Validators.required]
    })
  }

  getCategories() {
    this._settingsService.getCategory().subscribe(
      (res: any) => {
        this.tipe_vehicle = res.reverse();
        // console.log(res);

        this.dataSource = new MatTableDataSource(this.tipe_vehicle);
      }
    );
  }

  onSubmit() {
    this.addCategory();
  }

  addCategory() {
    const data = this.formAdd.value;
    this._settingsService.addCategory(data).subscribe(
      res => {
        console.log(res);
        this._settingsService.openSnackBar('success', `Tipo ${res.name} creado con éxito!!`)
        this.getCategories()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        console.log(err);

        this._settingsService.openSnackBar('error', `${err}`)
      },
    )
  }

  deleteReg(id: number) {
    this._settingsService.deleteCategory(id).subscribe(
      res => {
        this._settingsService.openSnackBar('success', `Tipo "${res.name}" eliminado con éxito!!`)
        this.getCategories()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        this._settingsService.openSnackBar('success', err)

      }
    )
  }

  ///////EDIT
  openEdit(element: any) {
    this.mostrar = false;
    this.formAdd.reset();
    this.edit = false;
    this.edit = true;
    this.formAdd.setValue(
      {
        name: element.name,
      }
    )
    this.idUpdate = element.id;
    this.mostrar = true;
    console.log(element);

  }

  update(id:number) {
    const data = this.formAdd.value;
    
    this._settingsService.updateCategory(id, data).subscribe(
      res => {
        console.log(res);
        this._settingsService.openSnackBar('success', `Tipo ${res.name} Actualizado con éxito!!`)
        this.getCategories()
        this.formAdd.reset();
        this.mostrar = false;
        this.idUpdate = null;
      },
      err => {
        console.log(err);

        this._settingsService.openSnackBar('error', `${err}`)
      },
    )
  }  
  
  oculta(estado) {
    this.edit = false;
    this.formAdd.reset();
    this.mostrar = estado
  }
  //////////

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
