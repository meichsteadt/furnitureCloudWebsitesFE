import { Component, OnInit } from '@angular/core';
import { Financing } from '../financing.model';
import { FinancingService } from '../financing.service';

@Component({
  selector: 'app-financing',
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.scss'],
  providers: [FinancingService]
})
export class FinancingComponent implements OnInit {
  financings: Financing[];
  constructor(private financingService: FinancingService) { }

  ngOnInit() {
      this.financings = this.financingService.getFinancings();
  }

}
