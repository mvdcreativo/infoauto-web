import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingApiService } from '../services/setting-api.service';
import { VehicleSubModel, Brand, VehicleModel } from 'src/app/interfaces/resultado';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { startWith, map } from 'rxjs/operators';

@Component({
  templateUrl: './submodel.component.html',
  styleUrls: ['./submodel.component.scss']
})
export class SubmodelComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'brand', 'model','image_url', 'acciones'];
  subModel: VehicleSubModel[];
  vehicleModel: VehicleModel[];
  brands: Brand [];
  dataSource: any;
  urlFiles = `${environment.urlFiles}`;

  formAdd: FormGroup
  mostrar: boolean = false;
  filteredOptionsBrand: Observable<Brand[]>;
  filteredOptionsModel: Observable<VehicleModel[]>;
  idUpdate: any;
  edit: boolean;

  constructor(
    private _settingsService: SettingApiService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.selectBrand()
    
    this.getSubModel()

  }
  
  onSubmit() {
    
    this.addSubModel();
  }

  addSubModel() {
    const data = {
      model_id : this.formAdd.controls.vehicle_model_id.value.id,
      name: this.formAdd.controls.name.value
    }

    console.log(data);
    
    this._settingsService.addSubModel(data).subscribe(
      res => {
        console.log(res);
        this._settingsService.openSnackBar('success', `Sub-Modelo ${res.name} creado con éxito!!`)
        this.getSubModel()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        console.log(err);

        this._settingsService.openSnackBar('error', `${err}`)
      },
    )
  }


  /// INPUT SELECT MARCA autocomplete
  selectBrand() {
    this._settingsService.getBrands().subscribe(
        (brands: any) => {
          this.brands = brands
          
        }
      );
  }

  selectChangesBrand(){
    if(this.brands){

    this.filteredOptionsBrand = this.formAdd.controls.brand_id.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name, this.brands ) : this.brands.slice())
      
    );
    }

  }
  selectChangesModel(){
    if(this.vehicleModel){
      this.filteredOptionsModel = this.formAdd.controls.vehicle_model_id.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name, this.vehicleModel ) : this.vehicleModel.slice())
        
      );

    }


  }

  displayFn(table?: any): string | undefined {

    return table ? table.name : undefined;
  }

  private _filter(name: string, tabla: any): any[] {
    const filterValue = name.toLowerCase();

    return tabla.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

///////////////


  getSubModel(){
    this._settingsService.getSubModel().subscribe(
      (res:any) => {
        this.subModel = res.reverse();
        this.createForm();
        this.dataSource = new MatTableDataSource(this.subModel);
        this.dataSource.paginator = this.paginator;

      }
    );
  }

  getModels(e:MatAutocompleteSelectedEvent) {
    this.formAdd.controls.vehicle_model_id.reset()
    console.log(e.option.value)
    this.vehicleModel = e.option.value.vehicle_models
    this.selectChangesModel()
    console.log(this.vehicleModel);
    // this._settingsService.getModelsByIDBrand(brand_id).subscribe(
    //   (res: any) => {
    //     this.vehicleModel = res.vehicle_models;
    //   }
    // );
  }

  createForm() {
    this.formAdd = this.fb.group({
      name: [null, Validators.required],
      brand_id: [null, Validators.compose(
        [Validators.required, this.autocompleteObjectValidator()]
      )],
      vehicle_model_id: [null, Validators.compose(
        [Validators.required, this.autocompleteObjectValidator()]
      )],
    })
    this.selectChangesBrand()
    this.selectChangesModel()


  }


 ///////EDIT
 openEdit(element: any) {
  this.mostrar = false;
  this.formAdd.reset();
  this.edit = false;
  this.edit = true;
  console.log(element);
  
  this.formAdd.setValue(
    {
      name: element.name,
      vehicle_model_id: element.vehicle_model,
      brand_id: element.vehicle_model.brand
    }
  )
  this.idUpdate = element.id;
  this.mostrar = true;

}

update(id:number) {
  
  const data = {
    model_id : this.formAdd.controls.vehicle_model_id.value.id,
    name: this.formAdd.controls.name.value
  }

  console.log(data);
  
  this._settingsService.updateSubModel(id, data).subscribe(
    res => {
      console.log(res);
      this._settingsService.openSnackBar('success', `Sub Modelo ${res.name} Actualizado con éxito!!`)
      this.getSubModel()
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


  deleteReg(id: number) {
    this._settingsService.deleteSubModel(id).subscribe(
      res => {
        this._settingsService.openSnackBar('success', `Modelo "${res.name}" eliminado con éxito!!`)
        this.getSubModel()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        this._settingsService.openSnackBar('success', err)

      }
    )
  }
  ////VALIDA CAMPO AUTOCOMPLETE
  autocompleteObjectValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeof control.value === 'string') {
        return { 'invalidAutocompleteObject': { value: control.value } }
      }
      return null  /* valid option selected */
    }
  }
////
}
