import { Injectable } from "@angular/core";
import { CustomerClient } from "../clients/customer.client";

@Injectable({
    providedIn: 'root'
  })  
export class CustomerService {
    constructor(private customerClient: CustomerClient){}
    getCustomerDetail(id:any) {
        return new Promise(async(res) => {
            let customerDetail = await this.customerClient.getCustomerDetail(id);
            res(customerDetail);    
        })
    }
}