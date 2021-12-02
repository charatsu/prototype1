import { Injectable } from "@angular/core";
import { GatewayClient } from "./gateway.client";

@Injectable({
    providedIn: 'root',
  })  
export class PriceClient extends GatewayClient {
    // api = 'https://api.staging.contemisaasdev.com/pricing/api/v1/';
    override api = 'https://api.seamless.insure/pricing/api/v1/';
    // api = 'http://localhost:6003/api/v1/';

    getLookupOptions(id: string, lookupName: string, date: string) {
        return this.get('productLookups/' + id + '/' + lookupName + '/options?filter%5BeffectiveDate%5D='+date, {});
    }
}