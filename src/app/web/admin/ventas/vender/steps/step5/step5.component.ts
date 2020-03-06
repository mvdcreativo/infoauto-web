import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PublishService } from '../../../services/publish.service';

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

}
