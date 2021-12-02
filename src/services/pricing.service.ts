import { Injectable } from "@angular/core";
import { PriceClient } from "../clients/pricing.client";

@Injectable({
    providedIn: 'root'
  })  
export class PriceService {
    constructor(private priceClient:PriceClient){}
    getLookupOptions(id: string, lookupName: string, date: string): any {                
        return new Promise(async(res) => {
            let quoteDetail = await this.priceClient.getLookupOptions(id, lookupName, date);
            res(quoteDetail);    
        })
    }
}
