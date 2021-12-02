import { Injectable } from "@angular/core";
import { GatewayClient } from "./gateway.client";

@Injectable({
    providedIn: 'root',
  })  
export class CustomerClient extends GatewayClient {
    // api = 'https://api.staging.contemisaasdev.com/customer-api/';
    override api = 'https://api.seamless.insure/customer-api/';
    // api = 'http://localhost:6006/';

    getCustomerDetail(id:string) {
        return this.get('customer/' + id);
    }
}