import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  employeeId: any;
  showQualification = false;
  showProfessional = false;
  constructor( private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params.id;
    });
  }

  ngOnInit() {
  }

}
