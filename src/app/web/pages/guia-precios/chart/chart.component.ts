import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GuiaPreciosService } from 'src/app/services/guia-precios.service';
import { ActivatedRoute, Params } from '@angular/router';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

@Input() vehiculoDetalle: any;

  public lineChartData: ChartDataSets[] = [
    { data: null, label: '' },
  ]


  
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {}

  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(207, 209, 230)',
      backgroundColor: 'rgba(207, 209, 230,0.3)',
    },
  ];

  public lineChartLegend = false;
  public showLine = false
  public lineChartType = 'line';
  public lineChartPlugins = [];
  result: any;
  criterios: any;
  precios: any;
  data: { data: any; label: string; }[];
  vehiculo: string = '';
  promedio: number;
  sugerido: any;
  labels: Label[];
  dataL1: any;
  pMin: number;
  pMax: number;
  pSug: number;
  detalle: boolean = false;
  // criterios: any = [{brand:"alfa-romeo",  model: "155", }]

  constructor(
    private _gPServices : GuiaPreciosService,
    private _rutaAtiva : ActivatedRoute

  ) { }

  ngOnInit() {
    console.log(this._rutaAtiva.queryParamMap);
    
    this._rutaAtiva.queryParamMap.subscribe(
      (param: Params) => {
                
        if (param.params.brand) {
          console.log(param.params);
              
              this.getPrecios(param.params)
            }else{
              this.getCriteriosDetalle()
            }



        }
      )      
  }

  getCriteriosDetalle(){
    this._rutaAtiva.params.subscribe(
      (params:Params) => {
        console.log(params);
        const criterios = {brand: params.brand, model: params.model}
        this.getPrecios(criterios)

        this.detalle = true;
      }
    )
  }


  getPrecios(criterios){
    this._gPServices.pricesSearch(criterios).subscribe(
      (res:any) => {
        this.vehiculo = res[0].name_concat
        console.log(this.vehiculo);
        
        this.precios = res.map(
          res => res.price
        )

        this.calculos(this.precios);

        this.lineChartData = [
          { data: this.dataL1,
            label: this.vehiculo
          },
          { data: this.sugerido, 
            label: 'Vehiculo seleccionado', 
            type:'bar', 
            backgroundColor: 'rgb(12, 179, 156)', 
            maxBarThickness:5 , 
            pointRadius:10
          },
          { data: this.sugerido, 
            label: '', 
            pointBackgroundColor: 'rgb(12, 179, 156)' ,
            pointRadius:10, 
            pointHoverRadius: 11, 
            pointHoverBorderColor: 'rgb(12, 179, 156)', 
            pointHoverBackgroundColor:'rgb(12, 179, 156)',
          },
        ];
        
        this.lineChartLabels = this.labels
        console.log(this.precios);
        this.setOptionsChart()

      }
    )
  }


  calculos(precios: any) {
    const cantVehiculos:number = precios.length; 

    //convierte de string a número
    const p = precios.map(
      item => {return parseFloat(item)}
    )

    ///
    //Suma precios
    const total = p.reduce((a,b) => a+b);
    
    //promedio
    this.promedio = Math.round(total / cantVehiculos)
    console.log(this.promedio);
    var valSugerido: any;
    if(this.vehiculoDetalle){
      valSugerido = this.vehiculoDetalle.price
    }else{
      valSugerido = Math.round(this.promedio / 1.075)
    }
    //sugerido
console.log(valSugerido);

    const preciosConSug:any = p
    let indexSugerido:number;
    
      for (let index = 0; index < preciosConSug.length; index++) {

        if(preciosConSug[index] >= valSugerido){
          preciosConSug.splice(index, 0, valSugerido);
          indexSugerido = index;
          break
        }
  
      }



      //////DATOS PARA GRAFICO
    this.dataL1 = preciosConSug;
    this.labels = preciosConSug;
      /////////


    console.log(preciosConSug);
    
    this.sugerido = Array(this.labels.length)

    this.sugerido[indexSugerido] = valSugerido
    this.pSug = valSugerido;
    this.pMax = preciosConSug[preciosConSug.length - 1]
    this.pMin = preciosConSug[0]
    // console.log(this.sugerido);
  }


  setOptionsChart(){
    this.lineChartOptions = {
      // events: ['keypress'],
      title: {
        display:false,
        text: this.vehiculo
      },
      scales: {
        yAxes: [{
          display: false,
          gridLines: {
            display: false,
          }
        }],
        xAxes: [{
          display: false,
          gridLines: {
            display: false,
          }
        }],
      },
      responsive: true,
      tooltips:{
        backgroundColor: 'rgba(207, 209, 230,0.3)',
        enabled: false,
        intersect: false,
        mode: 'nearest'
      }
    }
  }
}
