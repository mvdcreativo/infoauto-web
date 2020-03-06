import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SettingApiService } from '../services/setting-api.service';
import { Brand } from 'src/app/interfaces/resultado';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brand: Brand [];
  displayedColumns: string[] = ['id', 'name', 'image_url', 'acciones' ];
  dataSource: any;
  formAdd : FormGroup
  mostrar :boolean = false;
  urlFiles= `${environment.urlFiles}`;
  selectedImage: FileList;
  idUpdate: any;
  edit: boolean;

  constructor(
    private _settingsService: SettingApiService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getBrand();
    this.createForm();
  }

  createForm(){
    this.formAdd = this.fb.group({
      name: [null, Validators.required],
    })
  }
  getBrand(){
    this._settingsService.getBrands().subscribe(
      (res:any) => {
        this.brand = res;
        
        this.brand.sort((a, b) => {
                  return (b.id - a.id)
                })

        this.dataSource = new MatTableDataSource(this.brand);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  
  onSubmit(){
    this.addBrand();
  }

  addBrand(){
    const data = this.formAdd.value;
    const formData = new FormData();

    formData.append('image', this.selectedImage[0]),
    formData.append('name', data.name )
    console.log(this.selectedImage[0]);
    
    
    this._settingsService.addBrand(formData).subscribe(
      res => {
        console.log(res);
        this._settingsService.openSnackBar('success', `Tipo ${res.name} creado con éxito!!`)
        this.getBrand()
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
    this._settingsService.deleteBrand(id).subscribe(
      res => {
        this._settingsService.openSnackBar('success', `Tipo "${res.name}" eliminado con éxito!!`)
        this.getBrand()
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
        }
      )


      this.idUpdate = element.id;
      this.mostrar = true;
      console.log(element);
      },500)
    }
  
    update(id:number) {
      const data = this.formAdd.value;
      const formData = new FormData();
  
      console.log(data);
      
      formData.append('_method', 'PUT')
      formData.append('image', this.selectedImage[0])
      formData.append('name', data.name )
      console.log(formData.get('name'));
      
      this._settingsService.updateBrand(id, formData).subscribe(
        res => {
          console.log(res);
          this._settingsService.openSnackBar('success', `Marca ${res.name} Actualizado con éxito!!`)
          this.getBrand()
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


  changeImage(e){
    
    if(e.target.files && e.target.files[0]){
      const selectedFiles = <FileList>e.target.files;
      this.selectedImage = selectedFiles;
      console.log(selectedFiles);
      // console.log(this.files);
      

      // this._publishService.uploadImage(this.publicationID, selectedFiles, index)
      // .subscribe(
      //   (event: HttpEvent<Object>) => {
          
      //     // console.log(event);
      //     if (event.type === HttpEventType.Response) {
      //       console.log('Upload Concluído');
      //       console.log(event.body);
      //       this.publication = event.body;
      //       this.getImages();
      //     } else if (event.type === HttpEventType.UploadProgress) {
      //       const percentDone = Math.round((event.loaded * 100) / event.total);
      //       // console.log('Progresso', percentDone);
      //       this.progress = percentDone;
      //     }
      //   }
      // )
    }
    
  }
}
