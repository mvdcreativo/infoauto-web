import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Extras } from 'src/app/interfaces/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SettingApiService } from '../services/setting-api.service';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'acciones' ];
  dataSource: any;
  formAdd : FormGroup
  mostrar :boolean = false;
  selectedImage: FileList;
  extras: Extras[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private _settingsService: SettingApiService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.getExtras();
    this.createForm();
  }

  createForm(){
    this.formAdd = this.fb.group({
      name: [null, Validators.required],
    })
  }
  getExtras(){
    this._settingsService.getExtras().subscribe(
      (res:any) => {
        this.extras = res.reverse();
        
        this.dataSource = new MatTableDataSource(this.extras);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  
  onSubmit(){
    this.addExtra();
  }

  addExtra(){
    const data = this.formAdd.value;
        
    this._settingsService.addExtra(data).subscribe(
      res => {
        console.log(res);
        this._settingsService.openSnackBar('success', `Caracteristica extra ${res.name} creado con éxito!!`)
        this.getExtras()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        console.log(err);
        
        this._settingsService.openSnackBar('error', `${err}`)
      },
    )
  }

  deleteReg(id:number){
    this._settingsService.deleteExtra(id).subscribe(
      res => {
        this._settingsService.openSnackBar('success', `Caracteristica extra "${res.name}" eliminado con éxito!!`)
        this.getExtras()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err =>{
        this._settingsService.openSnackBar('success', err)

      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
