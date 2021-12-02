import { Component, OnInit } from '@angular/core';
import { CustomerClient } from '../../clients/customer.client';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  personalDetail:any;
  constructor(private customerClient: CustomerClient) { }

  async ngOnInit(): Promise<void> {
    this.personalDetail = await this.customerClient.getCustomerDetail('303dc87f-c7a8-473b-84c6-570174f3863c');

  }

}
