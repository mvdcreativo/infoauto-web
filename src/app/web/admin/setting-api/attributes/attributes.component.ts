import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SettingApiService } from '../services/setting-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Attributes } from 'src/app/interfaces/product';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'depend', 'acciones' ];
  dataSource: any;
  formAdd : FormGroup
  mostrar :boolean = false;
  selectedImage: FileList;
  attributes: Attributes[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private _settingsService: SettingApiService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.getAttributes();
    this.createForm();
  }

  createForm(){
    this.formAdd = this.fb.group({
      attribute_id: [null],
      name: [null, Validators.required],
    })
  }
  getAttributes(){
    this._settingsService.getAttributes().subscribe(
      (res:any) => {
        this.attributes = res.reverse();
        
        this.dataSource = new MatTableDataSource(this.attributes);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  
  onSubmit(){
    this.addAttribute();
  }

  addAttribute(){
    const data = this.formAdd.value;
        
    this._settingsService.addAttribute(data).subscribe(
      res => {
        console.log(res);
        this._settingsService.openSnackBar('success', `Atributo ${res.name} creado con éxito!!`)
        this.getAttributes()
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
    this._settingsService.deleteAttribute(id).subscribe(
      res => {
        this._settingsService.openSnackBar('success', `Atributo "${res.name}" eliminado con éxito!!`)
        this.getAttributes()
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
