import { Injectable } from "@angular/core";
import { GatewayClient } from "./gateway.client";

@Injectable({
    providedIn: 'root',
  })  
export class ProductClient extends GatewayClient {
    // api = 'https://api.staging.contemisaasdev.com/configuration/api/v1/';
    override api = 'https://api.seamless.insure/configuration/api/v1/';
    // api = 'http://127.0.0.1:5003/api/v1/';

    getListProduct() {
        return this.get('salesProducts/activeVersions?page%5Bsize%5D=1000&page%5Bnumber%5D=1');
    }

    getProductDetail(id: string) {
        return this.get('products/' + id + '?include=productVersions%2CactiveVersion%2CsalesChannel')
    }
    
    getProductVersionDetail(id: string) {
        return this.get('productVersions/' + id)
    }
}