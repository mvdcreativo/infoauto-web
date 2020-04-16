import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PublishService } from 'src/app/modules/ventas/services/publish.service';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component implements OnInit {

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private _publishService: PublishService,

  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (param: Params) => {
        if (param.id) {
          this._publishService.getPublicationById(param.id)
          

        } else {
          this.route.navigate(['/vender/step1'])
        }


      }
    )

  }


  pagar(tariff_id){
    this.udatePublication(tariff_id)
  }

  udatePublication(data) {
    console.log(data);
    const tariff = {tariff_id : data}
    const nexStep = "/mi-cuenta/publicaciones"
    return this._publishService.updatePublication(tariff, nexStep)
  }

}
