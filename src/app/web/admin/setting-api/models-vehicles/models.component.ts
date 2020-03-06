import { Component, OnInit, ViewChild } from '@angular/core';

import { SettingApiService } from '../services/setting-api.service';
import { VehicleModel, Brand } from 'src/app/interfaces/resultado';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'brand', 'image_url', 'acciones'];
  vehicleModel: VehicleModel[];
  brands: Brand [];
  dataSource: any;
  urlFiles = `${environment.urlFiles}`;

  formAdd: FormGroup
  mostrar: boolean = false;
  filteredOptions: Observable<Brand[]>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  edit: boolean;
  idUpdate: number;
  
  constructor(
    private _settingsService: SettingApiService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

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

  ngOnInit() {
    this.selectBrand()
    
    this.getModels();
  }

  onSubmit() {
    this.addModel();
  }

  addModel() {
    const data = {
      brand_id : this.formAdd.controls.brand_id.value.id,
      name: this.formAdd.controls.name.value
    }

    console.log(data);
    
    this._settingsService.addModel(data).subscribe(
      res => {
        console.log(res);
        this._settingsService.openSnackBar('success', `Modelo ${res.name} creado con éxito!!`)
        this.getModels()
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
    this._settingsService.deleteModel(id).subscribe(
      res => {
        this._settingsService.openSnackBar('success', `Modelo "${res.name}" eliminado con éxito!!`)
        this.getModels()
        this.formAdd.reset();
        this.mostrar = false;
      },
      err => {
        this._settingsService.openSnackBar('success', err)

      }
    )
  }

  getModels() {
    this._settingsService.getModels().subscribe(
      (res: any) => {
        this.vehicleModel = res.reverse();
        this.dataSource = new MatTableDataSource(this.vehicleModel);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  createForm() {
    this.formAdd = this.fb.group({
      name: [null, Validators.required],
      brand_id: [null, Validators.compose(
        [Validators.required, this.autocompleteObjectValidator()]
      )]
    })
    this.selectChanges()
  }

  /// INPUT SELECT MARCA autocomplete
  selectBrand() {
    this._settingsService.getBrands().subscribe(
        (brands: any) => {
          this.brands = brands
          this.createForm();
          
          console.log(brands)
        }
      );
  }

  selectChanges(){
    if(this.brands){
      this.filteredOptions = this.formAdd.controls.brand_id.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.brands.slice())
        
      );
    }
  }

  displayFn(brand?: Brand): string | undefined {
    return brand ? brand.name : undefined;
  }

  private _filter(name: string): Brand[] {
    const filterValue = name.toLowerCase();

    return this.brands.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }



  ////////

   ///////EDIT
   openEdit(element: any) {
    this.mostrar = false;
    this.formAdd.reset();
    this.edit = false;
    this.edit = true;
    setTimeout(() => {
    this.formAdd.setValue(
      {
        name: element.name,
        brand_id: element.brand
      }
    )
    this.idUpdate = element.id;
    this.mostrar = true;
    console.log(element);
    },500)
  }

  update(id:number) {
    
    const data = {
      brand_id : this.formAdd.controls.brand_id.value.id,
      name: this.formAdd.controls.name.value
    }
    console.log(data);
    
    this._settingsService.updateModel(id, data).subscribe(
      res => {
        console.log(res);
        this._settingsService.openSnackBar('success', `Modelo ${res.name} Actualizado con éxito!!`)
        this.getModels()
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
