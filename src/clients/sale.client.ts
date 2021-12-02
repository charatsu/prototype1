import { Injectable } from "@angular/core";
import { GatewayClient } from "./gateway.client";

@Injectable({
    providedIn: 'root',
  })  
export class SaleClient extends GatewayClient {
    // api = 'https://api.staging.contemisaasdev.com/sales/api/v1/';
    override api = 'https://api.seamless.insure/sales/api/v1/';
    // api = 'http://localhost:6002/api/v1/';

    getQuote(id: string) {
        return this.get('quotes/' + id, {'Content-Type': 'application/vnd.api+json', Accept:'*/*'});
    }

    createQuote(data: any) {
        return this.post('quotes/createQuoteRequest', {'Content-Type': 'application/vnd.api+json', Accept:'*/*'}, data);
    }

    updateQuote(data: any) {
        return this.post('quotes/updateQuoteRequest', {'Content-Type': 'application/vnd.api+json', Accept:'*/*'}, data);
    }

    calculateQuote(data: any) {
        return this.post('quotes/calculatePriceRequest', {'Content-Type': 'application/vnd.api+json', Accept:'*/*'}, data); 
    }
    
    generateDocument(data: any) {
        return this.post('quotes/generateQuoteDocumentRequest', {'Content-Type': 'application/vnd.api+json', Accept:'*/*'}, data); 
    }

    completeQuote(data: any) {
        return this.post('quotes/completeQuoteRequest', {'Content-Type': 'application/vnd.api+json', Accept:'*/*'}, data); 
    }

    acceptanceQuote(data: any) {
        return this.post('quotes/acceptanceRequest', {'Content-Type': 'application/vnd.api+json', Accept:'*/*'}, data); 
    }
}
