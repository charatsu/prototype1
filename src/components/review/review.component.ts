import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/services/customer.service';
import { DocumentService } from 'src/services/document.service';
import { SaleService } from 'src/services/sale.service';
import { CustomerClient } from '../../clients/customer.client';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  personalDetail: any;
  quote: any;
  id: string;
  constructor(private customerService: CustomerService, private saleService: SaleService,
    private route: ActivatedRoute, private documentService: DocumentService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.queryParamMap.get('id');

    // let id = this.route.snapshot.paramMap.get('id');
    this.personalDetail = await this.customerService.getCustomerDetail('303dc87f-c7a8-473b-84c6-570174f3863c');
  }
  next(){
    this.router.navigate(['/payment'], {queryParams: {id: this.id}});
  }

}
